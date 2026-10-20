import { ButtonLink } from "@/components/ui/button";

export default function ForbiddenPage() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <section className="max-w-lg text-center">
        <p className="text-sm font-bold text-red-700">403</p>
        <h1 className="mt-2 text-3xl font-bold">Không có quyền truy cập</h1>
        <p className="mt-3 text-muted">Phiên hợp lệ nhưng tài khoản chưa được cấp quyền admin.access.</p>
        <div className="mt-6"><ButtonLink href="/">Về trang chủ</ButtonLink></div>
      </section>
    </main>
  );
}

