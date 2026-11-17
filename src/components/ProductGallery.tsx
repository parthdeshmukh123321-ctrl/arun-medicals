"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, name, badge }: { images: string[]; name: string; badge?: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  return (
    <div className="flex flex-col gap-3 lg:flex-row-reverse">
      <div
        className="relative aspect-square flex-1 overflow-hidden rounded-[28px] bg-cream-200 cursor-zoom-in"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        }}
        onMouseLeave={() => setZoom(null)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={active}
          src={images[active]}
          alt={`${name} – image ${active + 1}`}
          className="h-full w-full object-cover transition-transform duration-300 animate-fade-in"
          style={zoom ? { transform: "scale(1.8)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
        />
        {badge && (
          <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-cream-50">{badge}</span>
        )}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 lg:hidden">
            {images.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} className={cn("h-1.5 rounded-full bg-white/80 transition-all", i === active ? "w-6" : "w-1.5 opacity-60")} aria-label={`Image ${i + 1}`} />
            ))}
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto no-scrollbar lg:w-20 lg:flex-col">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square w-20 flex-none overflow-hidden rounded-2xl border-2 transition",
                i === active ? "border-sage-600" : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
