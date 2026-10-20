import { z } from "zod";

const placeholderPattern = /(change[_ -]?me|password|example|demo|admin123)/i;

export const ownerSeedInputSchema = z
  .object({
    email: z.string().trim().email().transform((value) => value.toLowerCase()),
    name: z.string().trim().min(2).max(100),
    password: z.string().min(14).max(200),
  })
  .superRefine(({ email, password }, context) => {
    const classes = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((pattern) =>
      pattern.test(password),
    ).length;

    if (classes < 3) {
      context.addIssue({
        code: "custom",
        path: ["password"],
        message: "Password must contain at least three character classes.",
      });
    }

    if (placeholderPattern.test(password) || password.toLowerCase().includes(email.split("@")[0])) {
      context.addIssue({
        code: "custom",
        path: ["password"],
        message: "Password must not contain placeholder text or the email local part.",
      });
    }
  });

