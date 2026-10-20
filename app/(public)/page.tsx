import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/product-card";

const demoProducts = [
  {
    name: "Bộ công cụ Machine Vision",
    summary: "Mẫu trình bày danh mục kỹ thuật; chưa phải sản phẩm hoặc báo giá thật.",
    type: "QUOTE" as const,
  },
  {
    name: "Edge AI Development Kit",
    summary: "Dữ liệu demo để kiểm tra card responsive và luồng yêu cầu tư vấn.",
    type: "CONTACT" as const,
  },
];

export default function HomePage() {
  return (
    <main>
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="font-bold tracking-tight">
            NTECH AI
          </Link>
          <Link href="/admin/login" className="text-sm font-semibold text-brand-700">
            Đăng nhập quản trị
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-[var(--space-section)] lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
            Dữ liệu demo — môi trường phát triển
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Nền tảng web kỹ thuật đang được xây dựng
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Khung Phase 0 cho catalog machine vision, embedded/edge AI, phần mềm kỹ thuật và
            quản trị. Nội dung doanh nghiệp, giá và chính sách chưa được công bố.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#demo-catalog">Xem giao diện mẫu</ButtonLink>
            <ButtonLink href="/admin/login" variant="secondary">
              Mở admin
            </ButtonLink>
          </div>
        </div>
        <aside className="rounded-card border border-blue-200 bg-brand-50 p-7 shadow-card">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-700">Phase 0</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
            <li>Next.js App Router + TypeScript</li>
            <li>PostgreSQL + Prisma migration</li>
            <li>Credentials auth, TOTP-ready, server-side RBAC</li>
            <li>Design tokens, test, build, CI và Docker dev</li>
          </ul>
        </aside>
      </section>

      <section id="demo-catalog" className="border-y border-border bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-brand-700">Demo only</p>
              <h2 className="mt-2 text-3xl font-bold">Component catalog foundation</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {demoProducts.map((product) => (
              <ProductCard key={product.name} {...product} demo />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

