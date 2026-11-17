import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-sage-900 text-cream-100 grain">
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-serif text-3xl font-semibold">Arun Medicals</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream-100/70">
              A family-run pharmacy serving our neighbourhood since 1994. Genuine medicines, honest advice and
              same-day doorstep delivery for the customers we see every day.
            </p>
            <div className="mt-6 flex items-center gap-3 text-xs text-cream-100/60">
              <span className="rounded-full border border-cream-100/20 px-3 py-1">Licensed Pharmacy · DL No. TN-02-1994</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Shop</p>
            <ul className="mt-4 space-y-2.5 text-sm text-cream-100/80">
              <li><Link href="/shop" className="hover:text-white">All products</Link></li>
              <li><Link href="/shop?category=pain-relief" className="hover:text-white">Pain & fever</Link></li>
              <li><Link href="/shop?category=vitamins" className="hover:text-white">Vitamins</Link></li>
              <li><Link href="/shop?category=skin-care" className="hover:text-white">Dermatology</Link></li>
              <li><Link href="/shop?category=diabetes-care" className="hover:text-white">Diabetes care</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Visit us</p>
            <ul className="mt-4 space-y-2.5 text-sm text-cream-100/80">
              <li>No. 14, Gandhi Road</li>
              <li>Near Town Bus Stand</li>
              <li>Chennai 600 017</li>
              <li className="pt-2 text-white">Open 7 AM – 11 PM, every day</li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Talk to a pharmacist</p>
            <ul className="mt-4 space-y-2.5 text-sm text-cream-100/80">
              <li>Phone: 98400 12345</li>
              <li>WhatsApp: 98400 12345</li>
              <li>hello@arunmedicals.in</li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-cream-100/10 pt-6 text-xs text-cream-100/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Arun Medicals. All rights reserved.</p>
          <p>Prescription medicines are dispensed only against a valid prescription.</p>
        </div>
      </div>
    </footer>
  );
}
