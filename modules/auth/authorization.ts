import "server-only";

import { headers } from "next/headers";

import { db } from "@/lib/db/client";
import { auth } from "@/modules/auth/auth";
import { hasPermission, requiresMfa, type PermissionCode } from "@/modules/auth/permissions";

export class AuthenticationRequiredError extends Error {
  constructor() {
    super("Authentication required");
    this.name = "AuthenticationRequiredError";
  }
}

export class PermissionDeniedError extends Error {
  constructor(permission: PermissionCode) {
    super(`Permission required: ${permission}`);
    this.name = "PermissionDeniedError";
  }
}

export class MfaEnrollmentRequiredError extends Error {
  constructor() {
    super("Owner and Admin accounts must enroll two-factor authentication");
    this.name = "MfaEnrollmentRequiredError";
  }
}

export async function requirePermission(permission: PermissionCode) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new AuthenticationRequiredError();
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      status: true,
      twoFactorEnabled: true,
      userRoles: {
        select: {
          role: {
            select: {
              code: true,
              permissions: { select: { permission: { select: { code: true } } } },
            },
          },
        },
      },
    },
  });

  const granted =
    user?.status === "ACTIVE"
      ? user.userRoles.flatMap(({ role }) =>
          role.permissions.map(({ permission: grantedPermission }) => grantedPermission.code),
        )
      : [];

  if (!hasPermission(granted, permission)) {
    throw new PermissionDeniedError(permission);
  }

  const roleCodes = user?.userRoles.map(({ role }) => role.code) ?? [];
  if (requiresMfa(roleCodes, user?.twoFactorEnabled ?? null)) {
    throw new MfaEnrollmentRequiredError();
  }

  return session;
}
