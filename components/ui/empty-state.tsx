import type { ReactNode } from "react";

export function EmptyState({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-card border border-dashed border-border bg-white p-8 text-center">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="mt-2 text-sm text-muted">{children}</div>
    </section>
  );
}

