"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/store/toast";

export function ReviewForm({ productId }: { productId: number }) {
  const router = useRouter();
  const push = useToast((s) => s.push);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        rating,
        author: fd.get("author"),
        title: fd.get("title"),
        body: fd.get("body"),
      }),
    });
    setBusy(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error ?? "Something went wrong. Please try again.");
      return;
    }
    push("Thanks! Your review is live.");
    setOpen(false);
    router.refresh();
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="inline-flex h-11 items-center rounded-full border border-ink/15 bg-white px-5 text-sm font-semibold transition hover:border-ink">
        Write a review
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-cream-200 bg-white p-6 animate-fade-up">
      <p className="font-serif text-xl">Share your experience</p>
      <div className="mt-4 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            type="button"
            key={i}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(i)}
            className="text-2xl transition-transform hover:scale-110"
            aria-label={`${i} star`}
          >
            <span className={(hover || rating) >= i ? "text-gold-500" : "text-cream-200"}>★</span>
          </button>
        ))}
        <span className="ml-2 text-sm text-ink/50">{rating} / 5</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <input name="author" required maxLength={120} placeholder="Your name" className="h-11 rounded-xl border border-cream-200 px-4 text-sm outline-none focus:border-sage-400" />
        <input name="title" required maxLength={160} placeholder="Review headline" className="h-11 rounded-xl border border-cream-200 px-4 text-sm outline-none focus:border-sage-400" />
      </div>
      <textarea name="body" required minLength={10} maxLength={1000} rows={4} placeholder="What did you think?" className="mt-3 w-full rounded-xl border border-cream-200 px-4 py-3 text-sm outline-none focus:border-sage-400" />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <div className="mt-4 flex gap-2">
        <button disabled={busy} className="h-11 rounded-full bg-ink px-6 text-sm font-semibold text-cream-50 hover:bg-sage-800 disabled:opacity-50">
          {busy ? "Posting…" : "Post review"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="h-11 px-4 text-sm font-medium text-ink/60 hover:text-ink">Cancel</button>
      </div>
    </form>
  );
}
