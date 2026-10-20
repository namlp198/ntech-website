import { defineConfig } from "vitest/config";

export default defineConfig({
  cacheDir: "../outputs/temporary/ntech-ai-vite",
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
