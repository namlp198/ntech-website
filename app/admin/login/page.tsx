"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { authClient } from "@/modules/auth/auth-client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(undefined);
    const form = new FormData(event.currentTarget);
    const result = await authClient.signIn.email({
      email: String(form.get("email")),
      password: String(form.get("password")),
      rememberMe: false,
    });
    setPending(false);

    if (result.error) {
      setError("Không thể đăng nhập. Kiểm tra thông tin và thử lại.");
      return;
    }
    if (result.data && "twoFactorRedirect" in result.data && result.data.twoFactorRedirect) {
      router.replace("/admin/two-factor");
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="grid min-h-screen place-items-center px-6 py-12">
      <section className="w-full max-w-md rounded-card border border-border bg-white p-8 shadow-card">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-800">Admin only</p>
        <h1 className="mt-3 text-3xl font-bold">Đăng nhập quản trị</h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          Tài khoản Owner chỉ được tạo bằng lệnh seed an toàn; không có tài khoản demo mặc định.
        </p>
        <form onSubmit={submit} className="mt-8 grid gap-5">
          <FormField id="email" name="email" type="email" autoComplete="username" required label="Email" />
          <FormField
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            label="Mật khẩu"
          />
          {error ? (
            <p role="alert" className="text-sm text-red-700">
              {error}
            </p>
          ) : null}
          <Button type="submit" disabled={pending}>
            {pending ? "Đang xác thực…" : "Đăng nhập"}
          </Button>
        </form>
      </section>
    </main>
  );
}
