import type { ReactNode } from "react";

export function AdminShell({ userName, children }: { userName: string; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="font-bold">NTECH AI Admin</p>
            <p className="text-xs text-amber-800">Môi trường phát triển — dữ liệu demo</p>
          </div>
          <p className="text-sm text-muted">{userName}</p>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
    </main>
  );
}

