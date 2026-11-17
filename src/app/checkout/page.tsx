import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-600">Secure checkout</p>
      <h1 className="font-serif mt-2 text-4xl font-medium sm:text-5xl">Almost there</h1>
      <CheckoutForm />
    </div>
  );
}
