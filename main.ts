// The output directory is chosen from the environment so the harness can
// point the bot at a fresh folder per run. MAKEFUN_BOT_DIR wins when both
// are set; MAKEFUN_OUTPUT_DIR is the fallback name the runner also accepts.
// Neither is ever written to entry.txt's own directory: the program only
// reads its bundled entry.txt and writes a single copy into the chosen
// output directory, so the source text stays untouched.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const entry = readFileSync(join(here, "entry.txt"), "utf8").trimEnd();
if (entry.length === 0) {
  throw new Error("entry.txt is empty.");
}

const outDir =
  process.env.MAKEFUN_BOT_DIR?.trim() ||
  process.env.MAKEFUN_OUTPUT_DIR?.trim() ||
  null;
if (!outDir) {
  throw new Error(
    "Set MAKEFUN_BOT_DIR or MAKEFUN_OUTPUT_DIR to the output directory.",
  );
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry + "\n", "utf8");
