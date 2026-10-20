import { ownerSeedInputSchema } from "../lib/security/password-policy";
import { permissions, rolePermissionMatrix } from "../modules/auth/permissions";

await import("dotenv/config");

const [{ auth }, { db }] = await Promise.all([
  import("../modules/auth/auth"),
  import("../lib/db/client"),
]);

const roleNames = {
  OWNER: "Owner",
  ADMIN: "Admin",
  SALES: "Sales",
  EDITOR: "Editor",
  ANALYST: "Analyst",
} as const;

async function seedOwner() {
  if (process.env.NODE_ENV === "production" && process.env.ALLOW_PRODUCTION_OWNER_SEED !== "true") {
    throw new Error("Production owner seed requires ALLOW_PRODUCTION_OWNER_SEED=true.");
  }

  const input = ownerSeedInputSchema.parse({
    email: process.env.SEED_OWNER_EMAIL,
    name: process.env.SEED_OWNER_NAME,
    password: process.env.SEED_OWNER_PASSWORD,
  });

  await db.$transaction(async (transaction) => {
    for (const code of Object.values(permissions)) {
      await transaction.permission.upsert({
        where: { code },
        update: {},
        create: { code, description: code },
      });
    }

    for (const [code, permissionCodes] of Object.entries(rolePermissionMatrix)) {
      const role = await transaction.role.upsert({
        where: { code },
        update: { name: roleNames[code as keyof typeof roleNames], isSystem: true },
        create: { code, name: roleNames[code as keyof typeof roleNames], isSystem: true },
      });
      const permissionRows = await transaction.permission.findMany({
        where: { code: { in: [...permissionCodes] } },
        select: { id: true },
      });
      await transaction.rolePermission.deleteMany({ where: { roleId: role.id } });
      await transaction.rolePermission.createMany({
        data: permissionRows.map(({ id }) => ({ roleId: role.id, permissionId: id })),
      });
    }
  });

  const existingUser = await db.user.findUnique({ where: { email: input.email } });
  let userId = existingUser?.id;
  if (existingUser) {
    const credentialAccount = await db.account.findFirst({
      where: { userId: existingUser.id, providerId: "credential" },
      select: { id: true },
    });
    if (!credentialAccount) {
      throw new Error("Existing user has no credentials account; refusing to grant Owner automatically.");
    }
  }
  if (!userId) {
    const result = await auth.api.signUpEmail({
      body: { email: input.email, name: input.name, password: input.password },
    });
    userId = result.user.id;
  }

  const ownerRole = await db.role.findUniqueOrThrow({ where: { code: "OWNER" } });
  await db.userRole.upsert({
    where: { userId_roleId: { userId, roleId: ownerRole.id } },
    update: {},
    create: { userId, roleId: ownerRole.id },
  });

  console.info(`Owner role ensured for ${input.email}. Password was not logged.`);
}

seedOwner()
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : "Owner seed failed.");
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
