import { and, asc, desc, eq, ilike, or, sql, inArray } from "drizzle-orm";
import { db } from "@/db";
import { categories, products, reviews } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";

export type ProductCard = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  shortDescription: string;
  price: string;
  compareAtPrice: string | null;
  images: string[];
  packSize: string;
  form: string;
  prescriptionRequired: boolean;
  stock: number;
  featured: boolean;
  tags: string[];
  categorySlug: string;
  categoryName: string;
  avgRating: number;
  reviewCount: number;
};

export type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

export type ProductFilters = {
  category?: string;
  q?: string;
  sort?: SortKey;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  otc?: boolean;
  form?: string;
};

const ratingSub = db
  .select({
    productId: reviews.productId,
    avgRating: sql<number>`avg(${reviews.rating})::float`.as("avg_rating"),
    reviewCount: sql<number>`count(*)::int`.as("review_count"),
  })
  .from(reviews)
  .groupBy(reviews.productId)
  .as("r");

const cardSelect = {
  id: products.id,
  slug: products.slug,
  name: products.name,
  brand: products.brand,
  shortDescription: products.shortDescription,
  price: products.price,
  compareAtPrice: products.compareAtPrice,
  images: products.images,
  packSize: products.packSize,
  form: products.form,
  prescriptionRequired: products.prescriptionRequired,
  stock: products.stock,
  featured: products.featured,
  tags: products.tags,
  categorySlug: categories.slug,
  categoryName: categories.name,
  avgRating: sql<number>`coalesce(${ratingSub.avgRating}, 0)`,
  reviewCount: sql<number>`coalesce(${ratingSub.reviewCount}, 0)`,
};

export async function getCategories() {
  await ensureSeeded();
  const rows = await db
    .select({
      id: categories.id,
      slug: categories.slug,
      name: categories.name,
      description: categories.description,
      image: categories.image,
      accent: categories.accent,
      productCount: sql<number>`count(${products.id})::int`,
    })
    .from(categories)
    .leftJoin(products, eq(products.categoryId, categories.id))
    .groupBy(categories.id)
    .orderBy(asc(categories.id));
  return rows;
}

export async function getProducts(filters: ProductFilters = {}): Promise<ProductCard[]> {
  await ensureSeeded();
  const conds = [];
  if (filters.category) conds.push(eq(categories.slug, filters.category));
  if (filters.q) {
    const term = `%${filters.q}%`;
    conds.push(
      or(ilike(products.name, term), ilike(products.brand, term), ilike(products.shortDescription, term)),
    );
  }
  if (filters.minPrice !== undefined) conds.push(sql`${products.price} >= ${filters.minPrice}`);
  if (filters.maxPrice !== undefined) conds.push(sql`${products.price} <= ${filters.maxPrice}`);
  if (filters.inStock) conds.push(sql`${products.stock} > 0`);
  if (filters.otc) conds.push(eq(products.prescriptionRequired, false));
  if (filters.form) conds.push(eq(products.form, filters.form));

  const orderBy = (() => {
    switch (filters.sort) {
      case "price-asc":
        return [asc(products.price)];
      case "price-desc":
        return [desc(products.price)];
      case "rating":
        return [desc(sql`coalesce(${ratingSub.avgRating}, 0)`), desc(sql`coalesce(${ratingSub.reviewCount}, 0)`)];
      case "newest":
        return [desc(products.createdAt), desc(products.id)];
      default:
        return [desc(products.featured), desc(sql`coalesce(${ratingSub.reviewCount}, 0)`), asc(products.id)];
    }
  })();

  const rows = await db
    .select(cardSelect)
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(ratingSub, eq(ratingSub.productId, products.id))
    .where(conds.length ? and(...conds) : undefined)
    .orderBy(...orderBy);
  return rows;
}

export async function getFeaturedProducts(limit = 8) {
  await ensureSeeded();
  return db
    .select(cardSelect)
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(ratingSub, eq(ratingSub.productId, products.id))
    .where(eq(products.featured, true))
    .orderBy(desc(sql`coalesce(${ratingSub.reviewCount}, 0)`), asc(products.id))
    .limit(limit);
}

export async function getProductBySlug(slug: string) {
  await ensureSeeded();
  const [product] = await db
    .select({
      ...cardSelect,
      description: products.description,
      highlights: products.highlights,
      usage: products.usage,
      categoryId: products.categoryId,
    })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(ratingSub, eq(ratingSub.productId, products.id))
    .where(eq(products.slug, slug))
    .limit(1);
  if (!product) return null;

  const [productReviews, related] = await Promise.all([
    db.select().from(reviews).where(eq(reviews.productId, product.id)).orderBy(desc(reviews.createdAt)),
    db
      .select(cardSelect)
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .leftJoin(ratingSub, eq(ratingSub.productId, products.id))
      .where(and(eq(products.categoryId, product.categoryId), sql`${products.id} <> ${product.id}`))
      .limit(4),
  ]);

  return { product, reviews: productReviews, related };
}

export async function getProductsByIds(ids: number[]) {
  if (!ids.length) return [];
  return db.select().from(products).where(inArray(products.id, ids));
}

export async function getForms() {
  await ensureSeeded();
  const rows = await db.selectDistinct({ form: products.form }).from(products).orderBy(asc(products.form));
  return rows.map((r) => r.form);
}

export async function getLatestReviews(limit = 3) {
  await ensureSeeded();
  return db
    .select({
      id: reviews.id,
      author: reviews.author,
      rating: reviews.rating,
      title: reviews.title,
      body: reviews.body,
      productName: products.name,
      productSlug: products.slug,
    })
    .from(reviews)
    .innerJoin(products, eq(reviews.productId, products.id))
    .where(eq(reviews.rating, 5))
    .orderBy(desc(reviews.createdAt))
    .limit(limit);
}
