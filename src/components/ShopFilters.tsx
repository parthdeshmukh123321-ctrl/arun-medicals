"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { cn } from "@/lib/utils";

type Cat = { slug: string; name: string; productCount: number };

export function ShopFilters({ categories, forms, maxPrice }: { categories: Cat[]; forms: string[]; maxPrice: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const current = {
    category: sp.get("category") ?? "",
    form: sp.get("form") ?? "",
    inStock: sp.get("inStock") === "1",
    otc: sp.get("otc") === "1",
    maxPrice: Number(sp.get("maxPrice") ?? maxPrice),
  };
  const [price, setPrice] = useState(current.maxPrice);
  useEffect(() => setPrice(current.maxPrice), [current.maxPrice]);

  const update = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(sp.toString());
      Object.entries(patch).forEach(([k, v]) => (v === null || v === "" ? next.delete(k) : next.set(k, v)));
      startTransition(() => router.push(`${pathname}?${next.toString()}`, { scroll: false }));
    },
    [sp, router, pathname],
  );

  const activeCount = [current.category, current.form, current.inStock, current.otc, sp.get("maxPrice")].filter(Boolean).length;

  const body = (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">Category</p>
        <ul className="mt-3 space-y-1">
          <li>
            <button onClick={() => update({ category: null })} className={cn("flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition hover:bg-sage-50", !current.category && "bg-sage-50 font-semibold text-sage-800")}>
              All products
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <button onClick={() => update({ category: c.slug })} className={cn("flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition hover:bg-sage-50", current.category === c.slug && "bg-sage-50 font-semibold text-sage-800")}>
                <span>{c.name}</span>
                <span className="text-xs text-ink/40">{c.productCount}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">Max price</p>
        <input
          type="range"
          min={20}
          max={maxPrice}
          step={10}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          onMouseUp={() => update({ maxPrice: price >= maxPrice ? null : String(price) })}
          onTouchEnd={() => update({ maxPrice: price >= maxPrice ? null : String(price) })}
          className="mt-3 w-full"
        />
        <div className="flex justify-between text-xs text-ink/60">
          <span>₹20</span>
          <span className="font-semibold text-ink">Up to ₹{price}</span>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">Form</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {forms.map((f) => (
            <button key={f} onClick={() => update({ form: current.form === f ? null : f })} className={cn("rounded-full border px-3 py-1 text-xs font-medium transition", current.form === f ? "border-ink bg-ink text-cream-50" : "border-cream-200 bg-white hover:border-ink/40")}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm">
          <input type="checkbox" checked={current.inStock} onChange={(e) => update({ inStock: e.target.checked ? "1" : null })} className="h-4 w-4 rounded accent-sage-600" />
          In stock only
        </label>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm">
          <input type="checkbox" checked={current.otc} onChange={(e) => update({ otc: e.target.checked ? "1" : null })} className="h-4 w-4 rounded accent-sage-600" />
          No prescription needed
        </label>
      </div>

      {activeCount > 0 && (
        <button onClick={() => router.push(pathname)} className="text-sm font-semibold text-sage-700 underline-offset-4 hover:underline">
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <button onClick={() => setOpen(true)} className="inline-flex h-10 items-center gap-2 rounded-full border border-cream-200 bg-white px-4 text-sm font-medium lg:hidden">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M7 12h10M10 18h4" /></svg>
        Filters {activeCount > 0 && <span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-[10px] text-cream-50">{activeCount}</span>}
      </button>
      <aside className="hidden lg:block">{body}</aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-ink/40 animate-fade-in" onClick={() => setOpen(false)} aria-label="Close filters" />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto bg-cream-50 p-6 shadow-2xl animate-fade-in">
            <div className="mb-6 flex items-center justify-between">
              <p className="font-serif text-2xl">Filters</p>
              <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-cream-200">✕</button>
            </div>
            {body}
            <button onClick={() => setOpen(false)} className="mt-8 h-12 w-full rounded-full bg-ink text-sm font-semibold text-cream-50">Show results</button>
          </div>
        </div>
      )}
    </>
  );
}

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const value = sp.get("sort") ?? "featured";
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="hidden text-ink/50 sm:inline">Sort by</span>
      <select
        value={value}
        onChange={(e) => {
          const next = new URLSearchParams(sp.toString());
          if (e.target.value === "featured") next.delete("sort");
          else next.set("sort", e.target.value);
          router.push(`${pathname}?${next.toString()}`, { scroll: false });
        }}
        className="h-10 rounded-full border border-cream-200 bg-white px-4 pr-8 text-sm font-medium outline-none focus:border-sage-300"
      >
        <option value="featured">Featured</option>
        <option value="rating">Top rated</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
        <option value="newest">Newest</option>
      </select>
    </label>
  );
}
