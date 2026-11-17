"use client";

import Link from "next/link";
import { useEffect } from "react";
import { selectSubtotal, useCart } from "@/store/cart";
import { FREE_SHIPPING_THRESHOLD, formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, setQuantity, removeItem } = useCart();
  const subtotal = useCart(selectSubtotal);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px] animate-fade-in"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream-50 shadow-2xl animate-slide-in">
        <div className="flex items-center justify-between border-b border-cream-200 px-6 py-5">
          <div>
            <h2 className="font-serif text-2xl font-semibold">Your basket</h2>
            <p className="text-xs text-ink/50">{items.length} {items.length === 1 ? "item" : "items"}</p>
          </div>
          <button onClick={closeCart} className="grid h-10 w-10 place-items-center rounded-full hover:bg-cream-200" aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <div className="px-6 pt-4">
          <div className="rounded-xl bg-sage-50 p-3 text-xs text-sage-800">
            {remaining > 0 ? (
              <p>Add <strong>{formatPrice(remaining)}</strong> more for free delivery</p>
            ) : (
              <p className="font-semibold">🎉 You've unlocked free delivery</p>
            )}
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sage-100">
              <div className="h-full rounded-full bg-sage-500 transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-cream-200 text-3xl">🧺</div>
              <p className="font-serif mt-5 text-xl">Your basket is empty</p>
              <p className="mt-1 text-sm text-ink/50">Everyday essentials are a tap away.</p>
              <Link href="/shop" onClick={closeCart} className="mt-6 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream-50 hover:bg-sage-800">
                Browse the shop
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-cream-200">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-4 py-4 animate-fade-in">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="h-20 w-20 flex-none rounded-xl object-cover bg-cream-200" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link href={`/product/${item.slug}`} onClick={closeCart} className="line-clamp-2 text-sm font-semibold leading-snug hover:text-sage-700">
                      {item.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-ink/50">{item.packSize}</p>
                    {item.prescriptionRequired && (
                      <span className="mt-1 w-fit rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800">Rx needed</span>
                    )}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="inline-flex items-center rounded-full border border-cream-200 bg-white">
                        <button onClick={() => setQuantity(item.productId, item.quantity - 1)} className="h-8 w-8 text-lg leading-none hover:text-sage-700">−</button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => setQuantity(item.productId, item.quantity + 1)} disabled={item.quantity >= item.stock} className="h-8 w-8 text-lg leading-none hover:text-sage-700 disabled:opacity-30">+</button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                        <button onClick={() => removeItem(item.productId)} className="text-xs text-ink/40 underline-offset-2 hover:text-red-600 hover:underline">Remove</button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-cream-200 bg-white px-6 py-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink/60">Subtotal</span>
              <span className="font-serif text-xl font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-ink/45">Delivery and taxes calculated at checkout.</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="mt-4 flex h-12 w-full items-center justify-center rounded-full bg-sage-700 text-sm font-semibold text-cream-50 shadow-lg shadow-sage-700/25 transition hover:bg-sage-800"
            >
              Proceed to checkout →
            </Link>
            <button onClick={closeCart} className="mt-2 w-full py-2 text-center text-xs font-medium text-ink/60 hover:text-ink">
              Continue shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
