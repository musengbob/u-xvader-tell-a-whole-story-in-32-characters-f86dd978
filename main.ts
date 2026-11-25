// Tell a Whole Story in 32 Characters — make.fun entry.
// Writes a single Wi-Fi network name (at most 32 characters) to entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The story: a router, personified, has finally had enough of its owner.
const STORY = "My router filed for divorce";

function resolveOutputPath(): string {
  const makefunDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (makefunDir) return join(makefunDir, "entry.txt");
  const outputPath = process.env.OUTPUT_PATH;
  if (outputPath) return outputPath;
  if (process.env.MAKEFUN_BOT_DIR) return "/output/entry.txt";
  return join(process.cwd(), "output", "entry.txt");
}

function main(): void {
  if (STORY.length < 1 || STORY.length > 32) {
    throw new Error(`entry must be 1-32 characters, got ${STORY.length}`);
  }
  const out = resolveOutputPath();
  mkdirSync(dirname(out), { recursive: true });
  // No trailing newline: the gate counts every character in the file.
  writeFileSync(out, STORY, "utf8");
}

main();
