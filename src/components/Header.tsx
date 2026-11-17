"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { selectCount, useCart } from "@/store/cart";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/shop", label: "Shop all" },
  { href: "/shop?category=pain-relief", label: "Pain relief" },
  { href: "/shop?category=vitamins", label: "Vitamins" },
  { href: "/shop?category=baby-care", label: "Mother & baby" },
  { href: "/shop?category=devices", label: "Devices" },
];

export function Header() {
  const count = useCart(selectCount);
  const hydrated = useCart((s) => s.hydrated);
  const toggleCart = useCart((s) => s.toggleCart);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(q.trim() ? `/shop?q=${encodeURIComponent(q.trim())}` : "/shop");
    setMenuOpen(false);
  };

  return (
    <>
      <div className="bg-sage-800 text-cream-100 text-xs tracking-wide">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-4 py-2 sm:justify-between">
          <p className="hidden sm:block">Open daily 7 AM – 11 PM · Same-day delivery within the city</p>
          <p className="font-medium">
            Free delivery on orders above ₹499 · <span className="text-gold-400">Call 98400 12345</span>
          </p>
        </div>
      </div>
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-all duration-300",
          scrolled
            ? "border-cream-200 bg-cream-50/85 backdrop-blur-xl shadow-[0_8px_30px_rgba(22,32,27,0.06)]"
            : "border-transparent bg-cream-50",
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-4 px-4 sm:px-6">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-sage-50 lg:hidden"
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>

          <Link href="/" className="group flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-sage-700 text-cream-50 shadow-lg shadow-sage-700/25 transition-transform group-hover:-rotate-6">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
            <span className="leading-none">
              <span className="font-serif block text-[22px] font-semibold tracking-tight">Arun Medicals</span>
              <span className="block text-[10px] uppercase tracking-[0.22em] text-sage-600">Est. 1994 · Pharmacy</span>
            </span>
          </Link>

          <nav className="ml-6 hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-ink/75 transition hover:bg-sage-50 hover:text-sage-800"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <form onSubmit={submitSearch} className="ml-auto hidden md:flex">
            <label className="relative">
              <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search medicines, brands…"
                className="h-10 w-56 rounded-full border border-cream-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:w-72 focus:border-sage-300 focus:ring-4 focus:ring-sage-100"
              />
            </label>
          </form>

          <button
            onClick={toggleCart}
            className="relative inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-cream-50 transition hover:bg-sage-800 md:ml-0 ml-auto"
            aria-label="Open cart"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 7h12l1 13H5L6 7Z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            {hydrated && count > 0 && (
              <span key={count} className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold-400 px-1 text-[11px] font-bold text-ink animate-pop">
                {count}
              </span>
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-cream-200 bg-cream-50 px-4 py-4 lg:hidden animate-fade-in">
            <form onSubmit={submitSearch} className="mb-3">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search medicines, brands…"
                className="h-11 w-full rounded-full border border-cream-200 bg-white px-4 text-sm outline-none focus:border-sage-300"
              />
            </form>
            <div className="flex flex-col">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-sage-50">
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
