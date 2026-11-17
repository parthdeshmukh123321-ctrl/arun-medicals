import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug } from "@/lib/queries";
import { discountPercent, formatPrice } from "@/lib/utils";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductPurchase } from "@/components/ProductPurchase";
import { ProductCard } from "@/components/ProductCard";
import { Stars } from "@/components/Stars";
import { ReviewForm } from "@/components/ReviewForm";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProductBySlug(slug);
  if (!data) return { title: "Product not found" };
  return { title: data.product.name, description: data.product.shortDescription };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const data = await getProductBySlug(slug);
  if (!data) notFound();
  const { product, reviews, related } = data;
  const off = discountPercent(product.price, product.compareAtPrice);

  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6">
      <nav className="text-xs text-ink/50">
        <Link href="/" className="hover:text-ink">Home</Link> <span className="mx-1.5">/</span>
        <Link href="/shop" className="hover:text-ink">Shop</Link> <span className="mx-1.5">/</span>
        <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-ink">{product.categoryName}</Link>
        <span className="mx-1.5">/</span><span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="animate-fade-in">
          <ProductGallery images={product.images} name={product.name} badge={off > 0 ? `Save ${off}%` : undefined} />
        </div>

        <div className="animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-600">{product.brand}</p>
          <h1 className="font-serif mt-2 text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">{product.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Stars rating={product.avgRating} size={16} />
            <span className="text-sm font-medium">{product.avgRating ? product.avgRating.toFixed(1) : "New"}</span>
            <a href="#reviews" className="text-sm text-ink/50 underline-offset-4 hover:underline">
              {product.reviewCount} {product.reviewCount === 1 ? "review" : "reviews"}
            </a>
            <span className="text-ink/30">·</span>
            <span className="text-sm text-ink/60">{product.packSize}</span>
          </div>

          <p className="mt-5 text-lg leading-relaxed text-ink/70">{product.shortDescription}</p>

          <div className="mt-6 flex items-end gap-3">
            <span className="font-serif text-4xl font-semibold">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="mb-1.5 text-base text-ink/40 line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
            {off > 0 && <span className="mb-2 rounded-full bg-sage-100 px-2.5 py-1 text-xs font-bold text-sage-800">You save {off}%</span>}
          </div>
          <p className="mt-1 text-xs text-ink/50">Inclusive of all taxes</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {product.stock > 0 ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-50 px-3 py-1 text-xs font-semibold text-sage-800">
                <span className="h-1.5 w-1.5 rounded-full bg-sage-500" />
                {product.stock <= 25 ? `Only ${product.stock} left` : "In stock"}
              </span>
            ) : (
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">Out of stock</span>
            )}
            {product.prescriptionRequired && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">Prescription required</span>
            )}
            <span className="rounded-full bg-cream-200 px-3 py-1 text-xs font-semibold text-ink/70">{product.form}</span>
          </div>

          <div className="mt-7">
            <ProductPurchase product={product} />
          </div>

          {product.prescriptionRequired && (
            <p className="mt-3 rounded-xl bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
              This medicine is dispensed only against a valid prescription. You can WhatsApp it to us at 98400 12345 or
              hand it over at delivery.
            </p>
          )}

          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {product.highlights.map((h) => (
              <li key={h} className="rounded-2xl border border-cream-200 bg-white p-3.5 text-sm font-medium leading-snug">
                <span className="mr-1.5 text-sage-600">✓</span>{h}
              </li>
            ))}
          </ul>

          <div className="mt-8 divide-y divide-cream-200 border-y border-cream-200">
            <details open className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold">
                About this product <span className="transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{product.description}</p>
            </details>
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold">
                Dosage & directions <span className="transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{product.usage}</p>
            </details>
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold">
                Delivery & returns <span className="transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                Same-day delivery within the city for orders placed before 8 PM. Free above ₹499, otherwise ₹40.
                Sealed, unopened items can be returned within 7 days. Prescription and temperature-sensitive medicines are non-returnable.
              </p>
            </details>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section id="reviews" className="mt-24 scroll-mt-28">
        <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-600">Reviews</p>
            <h2 className="font-serif mt-2 text-3xl font-medium">Customer feedback</h2>
            <div className="mt-5 flex items-center gap-4">
              <span className="font-serif text-6xl font-semibold leading-none">{product.avgRating ? product.avgRating.toFixed(1) : "–"}</span>
              <div>
                <Stars rating={product.avgRating} size={18} />
                <p className="mt-1 text-sm text-ink/50">Based on {product.reviewCount} {product.reviewCount === 1 ? "review" : "reviews"}</p>
              </div>
            </div>
            <ul className="mt-5 space-y-1.5">
              {dist.map((d) => (
                <li key={d.star} className="flex items-center gap-3 text-xs">
                  <span className="w-6 text-ink/60">{d.star}★</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-cream-200">
                    <div className="h-full rounded-full bg-gold-400" style={{ width: reviews.length ? `${(d.count / reviews.length) * 100}%` : 0 }} />
                  </div>
                  <span className="w-5 text-right text-ink/50">{d.count}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6"><ReviewForm productId={product.id} /></div>
          </div>

          <div className="space-y-4">
            {reviews.length === 0 && (
              <div className="rounded-3xl border border-dashed border-cream-200 bg-white p-10 text-center text-sm text-ink/55">
                No reviews yet — be the first to share your experience.
              </div>
            )}
            {reviews.map((r, i) => (
              <article key={r.id} className="rounded-3xl border border-cream-200 bg-white p-6 animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-sage-100 text-sm font-bold text-sage-800">
                      {r.author.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{r.author}</p>
                      <p className="text-xs text-ink/50">
                        {r.verified && <span className="mr-1.5 text-sage-700">✓ Verified purchase ·</span>}
                        {new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <Stars rating={r.rating} />
                </div>
                <p className="font-serif mt-4 text-lg">{r.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{r.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-24">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-600">You may also need</p>
              <h2 className="font-serif mt-2 text-3xl font-medium">More in {product.categoryName}</h2>
            </div>
            <Link href={`/shop?category=${product.categorySlug}`} className="text-sm font-semibold underline-offset-4 hover:underline">See all →</Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
