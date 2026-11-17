"use client";

import { useToast } from "@/store/toast";

export function Toaster() {
  const toasts = useToast((s) => s.toasts);
  const dismiss = useToast((s) => s.dismiss);
  if (!toasts.length) return null;
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[70] flex -translate-x-1/2 flex-col gap-2 px-4">
      {toasts.map((t) => (
        <button
          key={t.id}
          onClick={() => dismiss(t.id)}
          className="pointer-events-auto flex items-center gap-3 rounded-full bg-ink px-4 py-2.5 text-sm text-cream-50 shadow-2xl shadow-black/30 animate-pop"
        >
          {t.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={t.image} alt="" className="h-8 w-8 rounded-full object-cover" />
          )}
          <span className="font-medium">{t.message}</span>
          <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sage-500 text-[11px]">
            ✓
          </span>
        </button>
      ))}
    </div>
  );
}
