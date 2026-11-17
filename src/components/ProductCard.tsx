import Link from "next/link";
import type { ProductCard as ProductCardType } from "@/lib/queries";
import { discountPercent, formatPrice } from "@/lib/utils";
import { Stars } from "@/components/Stars";
import { AddToCartButton } from "@/components/AddToCartButton";

export function ProductCard({ product, index = 0 }: { product: ProductCardType; index?: number }) {
  const off = discountPercent(product.price, product.compareAtPrice);
  const low = product.stock > 0 && product.stock <= 25;
  return (
    <article
      className="group relative flex flex-col animate-fade-up"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <Link href={`/product/${product.slug}`} className="relative block overflow-hidden rounded-2xl bg-cream-200 aspect-[4/5]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.images[1] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[1]}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {off > 0 && (
            <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-cream-50">−{off}%</span>
          )}
          {product.prescriptionRequired && (
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-900">Rx</span>
          )}
          {product.tags.includes("bestseller") && (
            <span className="rounded-full bg-gold-400 px-2.5 py-1 text-[11px] font-semibold text-ink">Bestseller</span>
          )}
        </div>
        <div className="absolute bottom-3 right-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <AddToCartButton product={product} variant="icon" />
        </div>
      </Link>
      <div className="mt-3.5 flex flex-1 flex-col px-0.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage-600">{product.brand}</p>
        <Link href={`/product/${product.slug}`} className="mt-1 line-clamp-2 font-medium leading-snug hover:text-sage-700">
          {product.name}
        </Link>
        <p className="mt-0.5 text-xs text-ink/50">{product.packSize}</p>
        <div className="mt-2 flex items-center gap-1.5">
          <Stars rating={product.avgRating} size={12} />
          <span className="text-xs text-ink/50">{product.reviewCount > 0 ? `(${product.reviewCount})` : "New"}</span>
        </div>
        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <span className="font-serif text-lg font-semibold">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="ml-2 text-xs text-ink/40 line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
            {low && <p className="text-[11px] font-medium text-amber-700">Only {product.stock} left</p>}
          </div>
          <AddToCartButton product={product} variant="compact" label="Add" className="sm:hidden" />
        </div>
      </div>
    </article>
  );
}
