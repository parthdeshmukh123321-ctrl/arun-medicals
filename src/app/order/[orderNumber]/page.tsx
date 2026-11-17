import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Order confirmed" };

export default async function OrderPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = await params;
  const [order] = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber)).limit(1);
  if (!order) notFound();
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));

  const eta = order.deliveryMethod === "pickup" ? "Ready for pickup in about 30 minutes" : "Arriving today before 10 PM";
  const payment = { upi: "UPI", card: "Card on delivery", cod: "Cash on delivery" }[order.paymentMethod] ?? order.paymentMethod;

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-12 sm:px-6">
      <div className="text-center animate-fade-up">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage-100 text-3xl text-sage-700 animate-pop">✓</span>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-sage-600">Order confirmed</p>
        <h1 className="font-serif mt-2 text-4xl font-medium sm:text-5xl">Thank you, {order.customerName.split(" ")[0]}!</h1>
        <p className="mt-3 text-ink/60">
          Order <strong className="text-ink">{order.orderNumber}</strong> · {eta}
        </p>
        <p className="mt-1 text-sm text-ink/50">A confirmation has been sent to {order.email}</p>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-cream-200 bg-white animate-fade-up delay-1">
        <div className="grid gap-6 border-b border-cream-200 p-6 sm:grid-cols-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink/50">{order.deliveryMethod === "pickup" ? "Pickup at" : "Delivering to"}</p>
            <p className="mt-1 text-sm">{order.deliveryMethod === "pickup" ? "Arun Medicals, 14 Gandhi Road" : `${order.address}, ${order.city} ${order.pincode}`}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink/50">Payment</p>
            <p className="mt-1 text-sm">{payment}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink/50">Contact</p>
            <p className="mt-1 text-sm">{order.phone}</p>
          </div>
        </div>
        <ul className="divide-y divide-cream-200">
          {items.map((i) => (
            <li key={i.id} className="flex items-center gap-4 px-6 py-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={i.image} alt="" className="h-14 w-14 rounded-xl object-cover bg-cream-200" />
              <div className="flex-1">
                <p className="text-sm font-medium">{i.name}</p>
                <p className="text-xs text-ink/50">Qty {i.quantity} × {formatPrice(i.unitPrice)}</p>
              </div>
              <p className="text-sm font-semibold">{formatPrice(parseFloat(i.unitPrice) * i.quantity)}</p>
            </li>
          ))}
        </ul>
        <dl className="space-y-2 bg-cream-100 px-6 py-5 text-sm">
          <div className="flex justify-between"><dt className="text-ink/60">Subtotal</dt><dd>{formatPrice(order.subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-ink/60">Delivery</dt><dd>{parseFloat(order.shipping) === 0 ? "Free" : formatPrice(order.shipping)}</dd></div>
          <div className="flex justify-between pt-2 text-base"><dt className="font-semibold">Total paid</dt><dd className="font-serif text-2xl font-semibold">{formatPrice(order.total)}</dd></div>
        </dl>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3 animate-fade-up delay-2">
        <Link href="/shop" className="inline-flex h-12 items-center rounded-full bg-ink px-7 text-sm font-semibold text-cream-50 hover:bg-sage-800">Continue shopping</Link>
        <a href="https://wa.me/919840012345" className="inline-flex h-12 items-center rounded-full border border-ink/15 px-7 text-sm font-semibold hover:border-ink">Chat with pharmacist</a>
      </div>
    </div>
  );
}
