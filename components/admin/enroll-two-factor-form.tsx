"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { authClient } from "@/modules/auth/auth-client";

export function EnrollTwoFactorForm() {
  const router = useRouter();
  const [totpUri, setTotpUri] = useState<string>();
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [error, setError] = useState<string>();

  async function begin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);
    const password = String(new FormData(event.currentTarget).get("password"));
    const result = await authClient.twoFactor.enable({ password, method: "totp" });
    if (result.error) {
      setError("Không thể bắt đầu thiết lập TOTP. Kiểm tra lại mật khẩu.");
      return;
    }
    if (result.data.method === "totp") {
      setTotpUri(result.data.totpURI);
      setBackupCodes(result.data.backupCodes);
    }
  }

  async function verify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);
    const code = String(new FormData(event.currentTarget).get("code"));
    const result = await authClient.twoFactor.verifyTotp({ code, trustDevice: false });
    if (result.error) {
      setError("Mã TOTP không hợp lệ hoặc đã hết hạn.");
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  if (!totpUri) {
    return (
      <form onSubmit={begin} className="mt-6 grid gap-5">
        <FormField id="password" name="password" type="password" autoComplete="current-password" required label="Xác nhận mật khẩu" />
        {error ? <p role="alert" className="text-sm text-red-700">{error}</p> : null}
        <Button type="submit">Tạo secret TOTP</Button>
      </form>
    );
  }

  return (
    <div className="mt-6 grid gap-6">
      <div className="rounded-lg bg-slate-100 p-4 text-sm">
        <p className="font-bold">URI để nhập vào ứng dụng xác thực</p>
        <code className="mt-2 block break-all select-all">{totpUri}</code>
      </div>
      <div>
        <p className="text-sm font-bold">Mã dự phòng</p>
        <ul className="mt-2 grid grid-cols-2 gap-2 font-mono text-sm">
          {backupCodes.map((code) => <li key={code}>{code}</li>)}
        </ul>
      </div>
      <form onSubmit={verify} className="grid gap-5">
        <FormField id="code" name="code" inputMode="numeric" autoComplete="one-time-code" required label="Mã TOTP đầu tiên" />
        {error ? <p role="alert" className="text-sm text-red-700">{error}</p> : null}
        <Button type="submit">Hoàn tất MFA</Button>
      </form>
    </div>
  );
}
