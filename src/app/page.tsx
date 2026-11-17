import Link from "next/link";
import { getCategories, getFeaturedProducts, getLatestReviews } from "@/lib/queries";
import { ProductCard } from "@/components/ProductCard";
import { Stars } from "@/components/Stars";

export const dynamic = "force-dynamic";

const perks = [
  { icon: "⚡", title: "Same-day delivery", text: "Order before 8 PM and we'll be at your door tonight." },
  { icon: "✓", title: "100% genuine", text: "Sourced only from authorised distributors. Batch-tracked." },
  { icon: "☎", title: "Pharmacist on call", text: "Real advice from the same team you meet in store." },
  { icon: "↻", title: "Easy refills", text: "We keep your prescriptions on file and remind you." },
];

export default async function HomePage() {
  const [cats, featured, testimonials] = await Promise.all([
    getCategories(),
    getFeaturedProducts(8),
    getLatestReviews(3),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--color-sage-100),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_#f3e9d6,_transparent_50%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pb-24 lg:pt-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-sage-200 bg-white/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-sage-700 animate-fade-up">
              <span className="h-1.5 w-1.5 rounded-full bg-sage-500" /> Open now · Delivering today
            </p>
            <h1 className="font-serif mt-6 text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.02] tracking-tight animate-fade-up delay-1">
              Your neighbourhood pharmacy, <em className="italic text-sage-700">now at your doorstep.</em>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/70 animate-fade-up delay-2">
              Three decades of trusted care from the Arun Medicals family — genuine medicines, honest prices and
              the warmth of a counter you know, delivered the same day.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 animate-fade-up delay-3">
              <Link href="/shop" className="inline-flex h-13 items-center rounded-full bg-ink px-7 text-sm font-semibold text-cream-50 shadow-xl shadow-ink/20 transition hover:bg-sage-800">
                Shop essentials
              </Link>
              <Link href="/shop?category=vitamins" className="inline-flex h-13 items-center rounded-full border border-ink/15 bg-white/70 px-7 text-sm font-semibold backdrop-blur transition hover:border-ink">
                Daily vitamins →
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 animate-fade-up delay-4">
              <div className="flex -space-x-2">
                {["PR", "KS", "MD", "AK"].map((i, idx) => (
                  <span key={i} className="grid h-9 w-9 place-items-center rounded-full border-2 border-cream-50 bg-sage-200 text-[11px] font-bold text-sage-800" style={{ zIndex: 4 - idx }}>
                    {i}
                  </span>
                ))}
              </div>
              <div>
                <Stars rating={4.9} size={14} />
                <p className="text-xs text-ink/60">Loved by 12,000+ regulars since 1994</p>
              </div>
            </div>
          </div>

          <div className="relative grid grid-cols-6 grid-rows-6 gap-3 h-[460px] sm:h-[540px] animate-fade-in delay-2">
            <div className="relative col-span-4 row-span-4 overflow-hidden rounded-[28px] shadow-2xl shadow-sage-900/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/vitamin-c.jpg" alt="Vitamin C" className="h-full w-full object-cover" />
            </div>
            <div className="relative col-span-2 row-span-3 overflow-hidden rounded-[28px] shadow-xl shadow-sage-900/10 animate-float">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/paracetamol.jpg" alt="Paracetamol" className="h-full w-full object-cover" />
            </div>
            <div className="relative col-span-2 row-span-3 overflow-hidden rounded-[28px] bg-sage-700 p-5 text-cream-50">
              <p className="font-serif text-4xl font-semibold">30</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-cream-100/70">years of<br />trusted care</p>
              <svg className="absolute -bottom-6 -right-6 opacity-20" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 5v14M5 12h14" /></svg>
            </div>
            <div className="relative col-span-4 row-span-2 overflow-hidden rounded-[28px] shadow-xl shadow-sage-900/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/first-aid.jpg" alt="First aid" className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/60 to-transparent p-4">
                <p className="text-xs font-semibold text-cream-50">Pharmacist-curated first aid kit · ₹649</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="border-y border-cream-200 bg-white/60">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {perks.map((p, i) => (
            <div key={p.title} className="flex gap-3 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-sage-50 text-sage-700">{p.icon}</span>
              <div>
                <p className="text-sm font-semibold">{p.title}</p>
                <p className="text-xs leading-relaxed text-ink/55">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-600">Browse by need</p>
            <h2 className="font-serif mt-2 text-3xl font-medium sm:text-4xl">Featured collections</h2>
          </div>
          <Link href="/shop" className="hidden text-sm font-semibold underline-offset-4 hover:underline sm:block">View all →</Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {cats.map((c, i) => (
            <Link
              key={c.id}
              href={`/shop?category=${c.slug}`}
              className={`group relative overflow-hidden rounded-3xl bg-cream-200 animate-fade-up ${i === 0 || i === 5 ? "md:row-span-2 aspect-[4/5] md:aspect-auto" : "aspect-[4/5] md:aspect-[4/3]"}`}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-serif text-xl font-medium text-cream-50 sm:text-2xl">{c.name}</p>
                <p className="mt-0.5 text-xs text-cream-100/75">{c.productCount} products</p>
              </div>
              <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition group-hover:opacity-100">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-600">Customer favourites</p>
            <h2 className="font-serif mt-2 text-3xl font-medium sm:text-4xl">What regulars reach for</h2>
          </div>
          <Link href="/shop?sort=rating" className="hidden text-sm font-semibold underline-offset-4 hover:underline sm:block">Top rated →</Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Editorial banner */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <div className="relative overflow-hidden rounded-[32px] bg-sage-800 text-cream-50 grain">
          <div className="relative grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Prescription refills</p>
              <h3 className="font-serif mt-3 text-3xl font-medium leading-tight sm:text-4xl">
                Never run out of your monthly medicines again.
              </h3>
              <p className="mt-4 max-w-md text-cream-100/75">
                Share your prescription once. We'll keep it on file, remind you before you run low and deliver the
                refill — just like we've done at the counter for 30 years.
              </p>
              <a href="https://wa.me/919840012345" className="mt-7 inline-flex h-12 items-center rounded-full bg-cream-50 px-6 text-sm font-semibold text-ink transition hover:bg-gold-400">
                WhatsApp your prescription
              </a>
            </div>
            <div className="relative h-64 overflow-hidden rounded-3xl lg:h-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/diabetes.jpg" alt="Diabetes care kit" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-600">From our customers</p>
          <h2 className="font-serif mt-2 text-3xl font-medium sm:text-4xl">Words from the neighbourhood</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={t.id} className="rounded-3xl border border-cream-200 bg-white p-7 animate-fade-up" style={{ animationDelay: `${i * 90}ms` }}>
              <Stars rating={t.rating} />
              <blockquote className="font-serif mt-4 text-lg leading-relaxed">“{t.body}”</blockquote>
              <figcaption className="mt-5 flex items-center justify-between text-xs">
                <span className="font-semibold">{t.author}</span>
                <Link href={`/product/${t.productSlug}`} className="text-sage-700 hover:underline">{t.productName}</Link>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
