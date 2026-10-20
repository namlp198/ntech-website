import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function typescriptFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory()
      ? typescriptFiles(path)
      : /\.tsx?$/.test(entry)
        ? [path]
        : [];
  });
}

describe("modular monolith boundaries", () => {
  it("keeps business modules independent from App Router and UI composition", () => {
    const violations = typescriptFiles(join(process.cwd(), "modules")).filter((file) => {
      const source = readFileSync(file, "utf8");
      return /from\s+["']@\/(?:app|components)\//.test(source);
    });

    expect(violations).toEqual([]);
  });
});

