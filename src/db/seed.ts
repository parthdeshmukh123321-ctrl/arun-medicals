import { sql } from "drizzle-orm";
import { db } from "@/db";
import { categories, products, reviews } from "@/db/schema";
import { seedCategories, seedProducts } from "@/db/seed-data";

let seedPromise: Promise<void> | null = null;

async function runSeed() {
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(categories);
  if (Number(count) > 0) return;

  const insertedCategories = await db
    .insert(categories)
    .values(seedCategories)
    .returning({ id: categories.id, slug: categories.slug });
  const catMap = new Map(insertedCategories.map((c) => [c.slug, c.id]));

  for (const p of seedProducts) {
    const categoryId = catMap.get(p.category);
    if (!categoryId) continue;
    const [inserted] = await db
      .insert(products)
      .values({
        slug: p.slug,
        name: p.name,
        brand: p.brand,
        categoryId,
        shortDescription: p.shortDescription,
        description: p.description,
        price: p.price,
        compareAtPrice: p.compareAtPrice ?? null,
        images: p.images,
        packSize: p.packSize,
        form: p.form,
        prescriptionRequired: p.prescriptionRequired ?? false,
        stock: p.stock,
        featured: p.featured ?? false,
        tags: p.tags,
        highlights: p.highlights,
        usage: p.usage,
      })
      .returning({ id: products.id });

    if (p.reviews.length) {
      await db.insert(reviews).values(
        p.reviews.map((r) => ({
          productId: inserted.id,
          author: r.author,
          rating: r.rating,
          title: r.title,
          body: r.body,
          verified: true,
          createdAt: new Date(Date.now() - r.daysAgo * 86_400_000),
        })),
      );
    }
  }
}

/** Idempotent: seeds the catalogue once if the database is empty. */
export function ensureSeeded() {
  if (!seedPromise) {
    seedPromise = runSeed().catch((err) => {
      seedPromise = null;
      throw err;
    });
  }
  return seedPromise;
}
