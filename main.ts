// Last Out of Office: The AI That Went Barista
// Reads entry.txt and writes the entry text to the output directory
// named by MAKEFUN_BOT_DIR or MAKEFUN_OUTPUT_DIR.
// Node 22+, stdlib only. No network, no wall clock.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const entry = readFileSync(join(here, "entry.txt"), "utf8").trimEnd();
if (entry.length === 0) {
  throw new Error("entry.txt is empty.");
}

const outDir =
  process.env.MAKEFUN_BOT_DIR ?? process.env.MAKEFUN_OUTPUT_DIR ?? null;
if (!outDir) {
  throw new Error(
    "Set MAKEFUN_BOT_DIR or MAKEFUN_OUTPUT_DIR to the output directory.",
  );
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry + "\n", "utf8");
