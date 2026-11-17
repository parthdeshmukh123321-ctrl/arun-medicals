import { inArray, sql } from "drizzle-orm";
import { db } from "@/db";
import { orderItems, orders, products } from "@/db/schema";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/lib/utils";

export const dynamic = "force-dynamic";

type IncomingItem = { productId: number; quantity: number };

function orderNumber() {
  const d = new Date();
  const stamp = `${d.getFullYear().toString().slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AM-${stamp}-${rand}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const items: IncomingItem[] = Array.isArray(body.items)
      ? body.items.map((i: IncomingItem) => ({ productId: Number(i.productId), quantity: Math.max(1, Math.floor(Number(i.quantity))) }))
      : [];
    const required = ["customerName", "email", "phone", "address", "city", "pincode"] as const;
    for (const k of required) {
      if (!String(body[k] ?? "").trim()) {
        return Response.json({ error: `Missing ${k}` }, { status: 400 });
      }
    }
    if (!items.length) return Response.json({ error: "Your basket is empty" }, { status: 400 });

    const deliveryMethod = body.deliveryMethod === "pickup" ? "pickup" : "delivery";
    const paymentMethod = ["cod", "upi", "card"].includes(body.paymentMethod) ? body.paymentMethod : "cod";

    const result = await db.transaction(async (tx) => {
      const ids = items.map((i) => i.productId);
      const rows = await tx.select().from(products).where(inArray(products.id, ids));
      const byId = new Map(rows.map((r) => [r.id, r]));

      let subtotal = 0;
      const lines = items.map((i) => {
        const p = byId.get(i.productId);
        if (!p) throw new Error(`Product ${i.productId} no longer available`);
        if (p.stock < i.quantity) throw new Error(`Only ${p.stock} of ${p.name} left in stock`);
        const unit = parseFloat(p.price);
        subtotal += unit * i.quantity;
        return { product: p, quantity: i.quantity, unit };
      });

      const shipping = deliveryMethod === "pickup" || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
      const total = subtotal + shipping;

      const [order] = await tx
        .insert(orders)
        .values({
          orderNumber: orderNumber(),
          customerName: String(body.customerName).trim(),
          email: String(body.email).trim(),
          phone: String(body.phone).trim(),
          address: String(body.address).trim(),
          city: String(body.city).trim(),
          pincode: String(body.pincode).trim(),
          deliveryMethod,
          paymentMethod,
          notes: body.notes ? String(body.notes).slice(0, 500) : null,
          subtotal: subtotal.toFixed(2),
          shipping: shipping.toFixed(2),
          total: total.toFixed(2),
          status: "confirmed",
        })
        .returning();

      await tx.insert(orderItems).values(
        lines.map((l) => ({
          orderId: order.id,
          productId: l.product.id,
          name: l.product.name,
          image: l.product.images[0] ?? "",
          unitPrice: l.unit.toFixed(2),
          quantity: l.quantity,
        })),
      );

      for (const l of lines) {
        await tx
          .update(products)
          .set({ stock: sql`${products.stock} - ${l.quantity}` })
          .where(sql`${products.id} = ${l.product.id}`);
      }

      return order;
    });

    return Response.json({ orderNumber: result.orderNumber, total: result.total }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not place order";
    console.error(err);
    return Response.json({ error: message }, { status: 400 });
  }
}
