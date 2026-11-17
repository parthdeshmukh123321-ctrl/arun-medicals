import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto grid max-w-7xl place-items-center px-4 py-32 text-center">
      <div className="animate-fade-up">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-600">404</p>
        <h1 className="font-serif mt-3 text-5xl font-medium">We couldn't find that shelf</h1>
        <p className="mt-3 text-ink/60">The page you're looking for may have moved or been discontinued.</p>
        <Link href="/shop" className="mt-8 inline-flex h-12 items-center rounded-full bg-ink px-7 text-sm font-semibold text-cream-50 hover:bg-sage-800">
          Back to the shop
        </Link>
      </div>
    </div>
  );
}
