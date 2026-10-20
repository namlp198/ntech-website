import { prismaAdapter } from "@better-auth/prisma-adapter";
import { betterAuth } from "better-auth/minimal";
import { twoFactor } from "better-auth/plugins";

import { db } from "@/lib/db/client";
import { getServerEnv } from "@/lib/env";

const env = getServerEnv();

export const auth = betterAuth({
  appName: "NTECH AI Admin",
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 14,
    maxPasswordLength: 200,
  },
  session: {
    expiresIn: 60 * 60 * 8,
    updateAge: 60 * 30,
  },
  advanced: {
    useSecureCookies: env.NODE_ENV === "production",
    database: {
      joins: true,
    },
  },
  plugins: [
    twoFactor({
      issuer: "NTECH AI Admin",
      skipVerificationOnEnable: false,
    }),
  ],
});

