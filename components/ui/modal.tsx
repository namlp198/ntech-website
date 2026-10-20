"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { Button } from "@/components/ui/button";

export function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog ref={ref} onClose={onClose} className="m-auto max-w-lg rounded-card p-0 backdrop:bg-slate-950/50">
      <section className="p-6">
        <div className="flex items-center justify-between gap-6">
          <h2 className="text-xl font-bold">{title}</h2>
          <Button variant="secondary" onClick={onClose} aria-label="Đóng hộp thoại">
            Đóng
          </Button>
        </div>
        <div className="mt-4">{children}</div>
      </section>
    </dialog>
  );
}

