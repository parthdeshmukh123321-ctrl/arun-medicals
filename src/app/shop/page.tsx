import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { getCategories, getForms, getProducts, type SortKey } from "@/lib/queries";
import { ProductCard } from "@/components/ProductCard";
import { ShopFilters, SortSelect } from "@/components/ShopFilters";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Shop" };

const SORTS: SortKey[] = ["featured", "price-asc", "price-desc", "rating", "newest"];

type SP = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ShopPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const category = first(sp.category);
  const q = first(sp.q);
  const sortRaw = first(sp.sort);
  const sort = SORTS.includes(sortRaw as SortKey) ? (sortRaw as SortKey) : "featured";
  const maxPrice = first(sp.maxPrice) ? Number(first(sp.maxPrice)) : undefined;

  const [products, categories, forms] = await Promise.all([
    getProducts({
      category,
      q,
      sort,
      maxPrice: maxPrice && !Number.isNaN(maxPrice) ? maxPrice : undefined,
      inStock: first(sp.inStock) === "1",
      otc: first(sp.otc) === "1",
      form: first(sp.form),
    }),
    getCategories(),
    getForms(),
  ]);

  const activeCat = categories.find((c) => c.slug === category);
  const title = q ? `Results for “${q}”` : activeCat?.name ?? "All products";
  const subtitle = q
    ? `${products.length} ${products.length === 1 ? "match" : "matches"} across the shop`
    : activeCat?.description ?? "Everything on our shelves — genuine, fresh and ready for same-day delivery.";

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6">
      <nav className="text-xs text-ink/50">
        <Link href="/" className="hover:text-ink">Home</Link> <span className="mx-1.5">/</span>
        <Link href="/shop" className="hover:text-ink">Shop</Link>
        {activeCat && (<><span className="mx-1.5">/</span><span className="text-ink">{activeCat.name}</span></>)}
      </nav>
      <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="animate-fade-up">
          <h1 className="font-serif text-4xl font-medium sm:text-5xl">{title}</h1>
          <p className="mt-2 max-w-xl text-ink/60">{subtitle}</p>
        </div>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        <Link href="/shop" className={`flex-none rounded-full border px-4 py-1.5 text-xs font-semibold transition ${!category ? "border-ink bg-ink text-cream-50" : "border-cream-200 bg-white hover:border-ink/40"}`}>All</Link>
        {categories.map((c) => (
          <Link key={c.slug} href={`/shop?category=${c.slug}`} className={`flex-none rounded-full border px-4 py-1.5 text-xs font-semibold transition ${category === c.slug ? "border-ink bg-ink text-cream-50" : "border-cream-200 bg-white hover:border-ink/40"}`}>
            {c.name}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr]">
        <Suspense>
          <div className="flex items-center justify-between lg:sticky lg:top-24 lg:block lg:self-start">
            <ShopFilters categories={categories} forms={forms} maxPrice={2500} />
            <div className="lg:hidden"><SortSelect /></div>
          </div>
        </Suspense>

        <div>
          <div className="mb-6 hidden items-center justify-between lg:flex">
            <p className="text-sm text-ink/60">Showing <strong className="text-ink">{products.length}</strong> products</p>
            <Suspense><SortSelect /></Suspense>
          </div>
          {products.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-cream-200 bg-white p-16 text-center">
              <p className="font-serif text-2xl">Nothing matched those filters</p>
              <p className="mt-2 text-sm text-ink/55">Try widening the price range or clearing a filter or two.</p>
              <Link href="/shop" className="mt-6 inline-flex h-11 items-center rounded-full bg-ink px-6 text-sm font-semibold text-cream-50">Reset filters</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
