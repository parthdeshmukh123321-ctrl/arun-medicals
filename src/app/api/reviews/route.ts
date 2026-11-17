import { eq } from "drizzle-orm";
import { db } from "@/db";
import { products, reviews } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const productId = Number(body.productId);
    const rating = Number(body.rating);
    const author = String(body.author ?? "").trim();
    const title = String(body.title ?? "").trim();
    const text = String(body.body ?? "").trim();

    if (!productId || !author || !title || text.length < 10 || rating < 1 || rating > 5) {
      return Response.json({ error: "Please fill in every field (review must be at least 10 characters)." }, { status: 400 });
    }
    const [exists] = await db.select({ id: products.id }).from(products).where(eq(products.id, productId)).limit(1);
    if (!exists) return Response.json({ error: "Product not found" }, { status: 404 });

    const [created] = await db
      .insert(reviews)
      .values({ productId, rating, author: author.slice(0, 120), title: title.slice(0, 160), body: text.slice(0, 1000), verified: false })
      .returning();
    return Response.json(created, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Could not save review" }, { status: 500 });
  }
}
