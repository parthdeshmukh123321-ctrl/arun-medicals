"use client";

import { useState } from "react";
import { AddToCartButton, type AddableProduct } from "@/components/AddToCartButton";

export function ProductPurchase({ product }: { product: AddableProduct }) {
  const [qty, setQty] = useState(1);
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="inline-flex h-13 items-center justify-between rounded-full border border-ink/15 bg-white px-2 sm:w-36">
        <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-9 w-9 place-items-center rounded-full text-xl hover:bg-cream-200">−</button>
        <span className="w-8 text-center font-semibold">{qty}</span>
        <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} disabled={qty >= product.stock} className="grid h-9 w-9 place-items-center rounded-full text-xl hover:bg-cream-200 disabled:opacity-30">+</button>
      </div>
      <AddToCartButton product={product} quantity={qty} className="flex-1" />
    </div>
  );
}
