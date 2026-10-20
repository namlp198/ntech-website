"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { authClient } from "@/modules/auth/auth-client";

export default function TwoFactorPage() {
  const router = useRouter();
  const [error, setError] = useState<string>();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = await authClient.twoFactor.verifyTotp({
      code: String(form.get("code")),
      trustDevice: false,
    });
    if (result.error) {
      setError("Mã xác thực không hợp lệ hoặc đã hết hạn.");
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="grid min-h-screen place-items-center px-6 py-12">
      <form onSubmit={submit} className="w-full max-w-md rounded-card border border-border bg-white p-8 shadow-card">
        <h1 className="text-3xl font-bold">Xác thực hai bước</h1>
        <p className="mt-2 text-sm text-muted">Nhập mã TOTP từ ứng dụng xác thực của bạn.</p>
        <div className="mt-6 grid gap-5">
          <FormField id="code" name="code" inputMode="numeric" autoComplete="one-time-code" required label="Mã TOTP" />
          {error ? <p role="alert" className="text-sm text-red-700">{error}</p> : null}
          <Button type="submit">Xác nhận</Button>
        </div>
      </form>
    </main>
  );
}

