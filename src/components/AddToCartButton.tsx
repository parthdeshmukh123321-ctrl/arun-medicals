"use client";

import { useState } from "react";
import { useCart } from "@/store/cart";
import { useToast } from "@/store/toast";
import { cn } from "@/lib/utils";

export type AddableProduct = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  images: string[];
  price: string;
  packSize: string;
  stock: number;
  prescriptionRequired: boolean;
};

export function AddToCartButton({
  product,
  quantity = 1,
  variant = "primary",
  className,
  label,
}: {
  product: AddableProduct;
  quantity?: number;
  variant?: "primary" | "compact" | "icon";
  className?: string;
  label?: string;
}) {
  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.openCart);
  const push = useToast((s) => s.push);
  const [busy, setBusy] = useState(false);
  const out = product.stock <= 0;

  const handle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (out) return;
    setBusy(true);
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        image: product.images[0],
        price: parseFloat(product.price),
        packSize: product.packSize,
        stock: product.stock,
        prescriptionRequired: product.prescriptionRequired,
      },
      quantity,
    );
    if (variant !== "primary") {
      // keep browsing on grid, show toast rather than drawer
      useCart.getState().closeCart();
      push(`Added ${product.name}`, product.images[0]);
    } else {
      openCart();
    }
    setTimeout(() => setBusy(false), 500);
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handle}
        disabled={out}
        aria-label="Add to basket"
        className={cn(
          "grid h-10 w-10 place-items-center rounded-full bg-ink text-cream-50 shadow-lg transition hover:bg-sage-700 disabled:cursor-not-allowed disabled:bg-ink/30",
          busy && "scale-90",
          className,
        )}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    );
  }

  if (variant === "compact") {
    return (
      <button
        onClick={handle}
        disabled={out}
        className={cn(
          "inline-flex h-9 items-center justify-center rounded-full border border-ink/15 bg-white px-4 text-xs font-semibold transition hover:border-ink hover:bg-ink hover:text-cream-50 disabled:cursor-not-allowed disabled:opacity-40",
          className,
        )}
      >
        {out ? "Out of stock" : busy ? "Added ✓" : (label ?? "Add to basket")}
      </button>
    );
  }

  return (
    <button
      onClick={handle}
      disabled={out}
      className={cn(
        "inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-sage-700 px-6 text-sm font-semibold text-cream-50 shadow-xl shadow-sage-700/25 transition hover:bg-sage-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-ink/30 disabled:shadow-none",
        className,
      )}
    >
      {out ? (
        "Currently out of stock"
      ) : busy ? (
        <>Added to basket ✓</>
      ) : (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 7h12l1 13H5L6 7Z" /><path d="M9 7a3 3 0 0 1 6 0" />
          </svg>
          {label ?? "Add to basket"}
        </>
      )}
    </button>
  );
}
