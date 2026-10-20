import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import {
  AuthenticationRequiredError,
  MfaEnrollmentRequiredError,
  PermissionDeniedError,
  requirePermission,
} from "@/modules/auth/authorization";
import { permissions } from "@/modules/auth/permissions";

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const userName = await authorizedUserName();
  return <AdminShell userName={userName}>{children}</AdminShell>;
}

async function authorizedUserName(): Promise<string> {
  try {
    const session = await requirePermission(permissions.adminAccess);
    return session.user.name;
  } catch (error) {
    if (error instanceof AuthenticationRequiredError) redirect("/admin/login");
    if (error instanceof MfaEnrollmentRequiredError) redirect("/admin/enroll-two-factor");
    if (error instanceof PermissionDeniedError) redirect("/admin/forbidden");
    throw error;
  }
}
