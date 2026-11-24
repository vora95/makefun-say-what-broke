import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Nothing is wrong with your internet. Our server is down, and so is the status page that says it isn't.";

// The bounty wants one line, 1-200 chars, no trailing newline in entry.txt.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry must be 1-200 chars, got ${ENTRY.length}`);
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read-back: the file on disk must be byte-identical to ENTRY.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt differs from ENTRY");
}
console.log(`wrote ${ENTRY.length} chars to ${outPath} (read-back OK)`);
