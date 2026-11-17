"use client";

import { create } from "zustand";

export type Toast = { id: number; message: string; image?: string };

type ToastState = {
  toasts: Toast[];
  push: (message: string, image?: string) => void;
  dismiss: (id: number) => void;
};

let nextId = 1;

export const useToast = create<ToastState>((set) => ({
  toasts: [],
  push: (message, image) => {
    const id = nextId++;
    set((s) => ({ toasts: [...s.toasts, { id, message, image }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 2800);
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
