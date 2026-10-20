export const permissions = {
  adminAccess: "admin.access",
  systemManage: "system.manage",
  usersManage: "users.manage",
  catalogView: "catalog.view",
  catalogManage: "catalog.manage",
  commerceView: "commerce.view",
  commerceManage: "commerce.manage",
  contentView: "content.view",
  contentManage: "content.manage",
  analyticsView: "analytics.view",
  customerDataExport: "customer-data.export",
  auditView: "audit.view",
} as const;

export type PermissionCode = (typeof permissions)[keyof typeof permissions];

export const rolePermissionMatrix = {
  OWNER: Object.values(permissions),
  ADMIN: [
    permissions.adminAccess,
    permissions.usersManage,
    permissions.catalogView,
    permissions.catalogManage,
    permissions.commerceView,
    permissions.commerceManage,
    permissions.contentView,
    permissions.contentManage,
    permissions.analyticsView,
    permissions.auditView,
  ],
  SALES: [
    permissions.adminAccess,
    permissions.catalogView,
    permissions.commerceView,
    permissions.commerceManage,
    permissions.analyticsView,
  ],
  EDITOR: [
    permissions.adminAccess,
    permissions.contentView,
    permissions.contentManage,
  ],
  ANALYST: [
    permissions.adminAccess,
    permissions.catalogView,
    permissions.commerceView,
    permissions.contentView,
    permissions.analyticsView,
  ],
} as const satisfies Record<string, readonly PermissionCode[]>;

export type RoleCode = keyof typeof rolePermissionMatrix;

export function hasPermission(
  grantedPermissions: readonly string[],
  requiredPermission: PermissionCode,
): boolean {
  return grantedPermissions.includes(requiredPermission);
}

export function requiresMfa(roleCodes: readonly string[], twoFactorEnabled: boolean | null): boolean {
  return roleCodes.some((code) => code === "OWNER" || code === "ADMIN") && twoFactorEnabled !== true;
}
