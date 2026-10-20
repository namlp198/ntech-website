import { describe, expect, it } from "vitest";

import { hasPermission, permissions, requiresMfa, rolePermissionMatrix } from "../../modules/auth/permissions";

describe("RBAC foundation", () => {
  it("grants every permission to Owner", () => {
    expect(rolePermissionMatrix.OWNER).toEqual(expect.arrayContaining(Object.values(permissions)));
  });

  it("does not grant role management to Sales or Editor", () => {
    expect(hasPermission(rolePermissionMatrix.SALES, permissions.usersManage)).toBe(false);
    expect(hasPermission(rolePermissionMatrix.EDITOR, permissions.usersManage)).toBe(false);
  });

  it("grants content editing only to Owner, Admin, and Editor", () => {
    expect(hasPermission(rolePermissionMatrix.EDITOR, permissions.contentManage)).toBe(true);
    expect(hasPermission(rolePermissionMatrix.SALES, permissions.contentManage)).toBe(false);
    expect(hasPermission(rolePermissionMatrix.ANALYST, permissions.contentManage)).toBe(false);
  });

  it("requires MFA enrollment for Owner and Admin roles", () => {
    expect(requiresMfa(["OWNER"], false)).toBe(true);
    expect(requiresMfa(["ADMIN"], null)).toBe(true);
    expect(requiresMfa(["SALES"], false)).toBe(false);
    expect(requiresMfa(["OWNER"], true)).toBe(false);
  });
});
