"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { selectSubtotal, useCart } from "@/store/cart";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE, cn, formatPrice } from "@/lib/utils";

const steps = ["Details", "Delivery", "Payment"];

const inputCls =
  "h-12 w-full rounded-xl border border-cream-200 bg-white px-4 text-sm outline-none transition focus:border-sage-400 focus:ring-4 focus:ring-sage-100";

export function CheckoutForm() {
  const router = useRouter();
  const { items, hydrated, clear, setQuantity, removeItem } = useCart();
  const subtotal = useCart(selectSubtotal);
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    city: "Chennai",
    pincode: "",
    deliveryMethod: "delivery",
    paymentMethod: "upi",
    notes: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const shipping = form.deliveryMethod === "pickup" || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const hasRx = items.some((i) => i.prescriptionRequired);

  const detailsValid =
    form.customerName.trim().length > 1 &&
    /^\S+@\S+\.\S+$/.test(form.email) &&
    form.phone.replace(/\D/g, "").length >= 10 &&
    form.address.trim().length > 5 &&
    form.city.trim().length > 1 &&
    /^\d{6}$/.test(form.pincode);

  async function placeOrder() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })) }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Could not place order");
      clear();
      router.push(`/order/${json.orderNumber}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setBusy(false);
    }
  }

  if (!hydrated) {
    return <div className="mt-10 h-64 animate-pulse rounded-3xl bg-cream-200" />;
  }

  if (items.length === 0) {
    return (
      <div className="mt-10 rounded-3xl border border-dashed border-cream-200 bg-white p-16 text-center">
        <p className="font-serif text-2xl">Your basket is empty</p>
        <p className="mt-2 text-sm text-ink/55">Add a few essentials before checking out.</p>
        <Link href="/shop" className="mt-6 inline-flex h-11 items-center rounded-full bg-ink px-6 text-sm font-semibold text-cream-50">Go to shop</Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_400px]">
      <div>
        <ol className="flex items-center gap-2 text-xs font-semibold">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <button
                onClick={() => i < step && setStep(i)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-3 py-1.5 transition",
                  i === step ? "bg-ink text-cream-50" : i < step ? "bg-sage-100 text-sage-800" : "bg-cream-200 text-ink/50",
                )}
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white/20 text-[10px]">{i < step ? "✓" : i + 1}</span>
                {s}
              </button>
              {i < steps.length - 1 && <span className="h-px w-6 bg-cream-200" />}
            </li>
          ))}
        </ol>

        <div key={step} className="mt-8 rounded-3xl border border-cream-200 bg-white p-6 sm:p-8 animate-fade-up">
          {step === 0 && (
            <>
              <h2 className="font-serif text-2xl">Contact & address</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Full name"><input className={inputCls} value={form.customerName} onChange={set("customerName")} placeholder="Priya Raman" autoComplete="name" /></Field>
                <Field label="Phone"><input className={inputCls} value={form.phone} onChange={set("phone")} placeholder="98400 12345" inputMode="tel" autoComplete="tel" /></Field>
                <Field label="Email" className="sm:col-span-2"><input className={inputCls} type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" autoComplete="email" /></Field>
                <Field label="Street address" className="sm:col-span-2"><input className={inputCls} value={form.address} onChange={set("address")} placeholder="Flat 2B, 14 Gandhi Road, T. Nagar" autoComplete="street-address" /></Field>
                <Field label="City"><input className={inputCls} value={form.city} onChange={set("city")} autoComplete="address-level2" /></Field>
                <Field label="PIN code"><input className={inputCls} value={form.pincode} onChange={set("pincode")} placeholder="600017" inputMode="numeric" maxLength={6} autoComplete="postal-code" /></Field>
              </div>
              <button disabled={!detailsValid} onClick={() => setStep(1)} className="mt-8 h-12 rounded-full bg-ink px-8 text-sm font-semibold text-cream-50 transition hover:bg-sage-800 disabled:cursor-not-allowed disabled:opacity-40">
                Continue to delivery →
              </button>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="font-serif text-2xl">How would you like it?</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Option active={form.deliveryMethod === "delivery"} onClick={() => setForm((f) => ({ ...f, deliveryMethod: "delivery" }))} title="Home delivery" subtitle="Same day · before 10 PM" price={subtotal >= FREE_SHIPPING_THRESHOLD ? "Free" : formatPrice(SHIPPING_FEE)} />
                <Option active={form.deliveryMethod === "pickup"} onClick={() => setForm((f) => ({ ...f, deliveryMethod: "pickup" }))} title="Store pickup" subtitle="Ready in 30 minutes" price="Free" />
              </div>
              {hasRx && (
                <p className="mt-5 rounded-xl bg-amber-50 p-4 text-xs leading-relaxed text-amber-900">
                  Your basket contains prescription medicines. Please WhatsApp your prescription to 98400 12345 or show it to our delivery partner / at the counter.
                </p>
              )}
              <Field label="Delivery notes (optional)" className="mt-5">
                <textarea className={cn(inputCls, "h-auto py-3")} rows={3} value={form.notes} onChange={set("notes")} placeholder="Gate code, landmark, preferred time…" />
              </Field>
              <div className="mt-8 flex gap-3">
                <button onClick={() => setStep(0)} className="h-12 rounded-full border border-ink/15 px-6 text-sm font-semibold hover:border-ink">← Back</button>
                <button onClick={() => setStep(2)} className="h-12 rounded-full bg-ink px-8 text-sm font-semibold text-cream-50 transition hover:bg-sage-800">Continue to payment →</button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-serif text-2xl">Payment</h2>
              <div className="mt-6 grid gap-3">
                <Option active={form.paymentMethod === "upi"} onClick={() => setForm((f) => ({ ...f, paymentMethod: "upi" }))} title="UPI" subtitle="GPay, PhonePe, Paytm — link sent after confirmation" price="" />
                <Option active={form.paymentMethod === "card"} onClick={() => setForm((f) => ({ ...f, paymentMethod: "card" }))} title="Card on delivery" subtitle="Our partner carries a card machine" price="" />
                <Option active={form.paymentMethod === "cod"} onClick={() => setForm((f) => ({ ...f, paymentMethod: "cod" }))} title="Cash on delivery" subtitle="Please keep exact change handy" price="" />
              </div>
              <div className="mt-6 rounded-2xl bg-cream-100 p-4 text-sm">
                <p className="font-semibold">Delivering to</p>
                <p className="mt-1 text-ink/70">{form.customerName} · {form.phone}</p>
                <p className="text-ink/70">{form.deliveryMethod === "pickup" ? "Pickup at Arun Medicals, 14 Gandhi Road" : `${form.address}, ${form.city} ${form.pincode}`}</p>
              </div>
              {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => setStep(1)} className="h-12 rounded-full border border-ink/15 px-6 text-sm font-semibold hover:border-ink">← Back</button>
                <button disabled={busy} onClick={placeOrder} className="h-12 flex-1 rounded-full bg-sage-700 px-8 text-sm font-semibold text-cream-50 shadow-xl shadow-sage-700/25 transition hover:bg-sage-800 disabled:opacity-60 sm:flex-none">
                  {busy ? "Placing order…" : `Place order · ${formatPrice(total)}`}
                </button>
              </div>
              <p className="mt-3 text-xs text-ink/45">By placing this order you agree to our terms. Prescription medicines are dispensed only against a valid prescription.</p>
            </>
          )}
        </div>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl border border-cream-200 bg-white p-6">
          <h3 className="font-serif text-xl">Order summary</h3>
          <ul className="mt-4 divide-y divide-cream-200">
            {items.map((i) => (
              <li key={i.productId} className="flex gap-3 py-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={i.image} alt="" className="h-16 w-16 flex-none rounded-xl object-cover bg-cream-200" />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-medium leading-snug">{i.name}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="inline-flex items-center rounded-full border border-cream-200 text-xs">
                      <button onClick={() => setQuantity(i.productId, i.quantity - 1)} className="h-7 w-7">−</button>
                      <span className="w-5 text-center font-medium">{i.quantity}</span>
                      <button onClick={() => setQuantity(i.productId, i.quantity + 1)} disabled={i.quantity >= i.stock} className="h-7 w-7 disabled:opacity-30">+</button>
                    </div>
                    <button onClick={() => removeItem(i.productId)} className="text-xs text-ink/40 hover:text-red-600">Remove</button>
                  </div>
                </div>
                <p className="text-sm font-semibold">{formatPrice(i.price * i.quantity)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-cream-200 pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-ink/60">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-ink/60">Delivery</dt><dd>{shipping === 0 ? <span className="font-semibold text-sage-700">Free</span> : formatPrice(shipping)}</dd></div>
            <div className="flex justify-between border-t border-cream-200 pt-3 text-base"><dt className="font-semibold">Total</dt><dd className="font-serif text-2xl font-semibold">{formatPrice(total)}</dd></div>
          </dl>
          {shipping > 0 && (
            <p className="mt-3 rounded-xl bg-sage-50 p-3 text-xs text-sage-800">Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free delivery.</p>
          )}
        </div>
        <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-ink/45">
          <span>🔒 Secure</span><span>✓ Genuine medicines</span><span>↻ 7-day returns</span>
        </div>
      </aside>
    </div>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/55">{label}</span>
      {children}
    </label>
  );
}

function Option({ active, onClick, title, subtitle, price }: { active: boolean; onClick: () => void; title: string; subtitle: string; price: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-between rounded-2xl border-2 p-4 text-left transition",
        active ? "border-sage-600 bg-sage-50" : "border-cream-200 bg-white hover:border-ink/30",
      )}
    >
      <span className="flex items-center gap-3">
        <span className={cn("grid h-5 w-5 place-items-center rounded-full border-2", active ? "border-sage-600" : "border-ink/30")}>
          {active && <span className="h-2.5 w-2.5 rounded-full bg-sage-600" />}
        </span>
        <span>
          <span className="block text-sm font-semibold">{title}</span>
          <span className="block text-xs text-ink/55">{subtitle}</span>
        </span>
      </span>
      {price && <span className="text-sm font-semibold">{price}</span>}
    </button>
  );
}
