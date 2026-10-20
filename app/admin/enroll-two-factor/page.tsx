import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { EnrollTwoFactorForm } from "@/components/admin/enroll-two-factor-form";
import { auth } from "@/modules/auth/auth";

export default async function EnrollTwoFactorPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/admin/login");

  return (
    <main className="grid min-h-screen place-items-center px-6 py-12">
      <section className="w-full max-w-xl rounded-card border border-border bg-white p-8 shadow-card">
        <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Bắt buộc cho Owner/Admin</p>
        <h1 className="mt-3 text-3xl font-bold">Thiết lập xác thực hai bước</h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          Secret và mã dự phòng chỉ hiển thị trong phiên thiết lập này. Lưu chúng ở nơi an toàn.
        </p>
        <EnrollTwoFactorForm />
      </section>
    </main>
  );
}

