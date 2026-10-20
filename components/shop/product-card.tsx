import { StatusBadge } from "@/components/ui/status-badge";

export function ProductCard({
  name,
  summary,
  type,
  demo = false,
}: {
  name: string;
  summary: string;
  type: "DIRECT" | "QUOTE" | "CONTACT";
  demo?: boolean;
}) {
  return (
    <article className="rounded-card border border-border bg-surface p-6 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <StatusBadge>{type}</StatusBadge>
        {demo ? <span className="text-xs font-bold uppercase text-amber-800">Dữ liệu demo</span> : null}
      </div>
      <h3 className="mt-5 text-xl font-bold">{name}</h3>
      <p className="mt-3 leading-7 text-muted">{summary}</p>
    </article>
  );
}

