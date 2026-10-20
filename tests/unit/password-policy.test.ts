import { describe, expect, it } from "vitest";

import { ownerSeedInputSchema } from "../../lib/security/password-policy";

describe("owner seed password policy", () => {
  it("accepts a non-placeholder high-entropy-shaped password", () => {
    expect(
      ownerSeedInputSchema.safeParse({
        email: "owner@example.invalid",
        name: "Initial Owner",
        password: "Long!Local-Seed#4827",
      }).success,
    ).toBe(true);
  });

  it("rejects weak and placeholder credentials", () => {
    expect(
      ownerSeedInputSchema.safeParse({
        email: "admin@example.invalid",
        name: "Admin",
        password: "admin123password",
      }).success,
    ).toBe(false);
  });
});

