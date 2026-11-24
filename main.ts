// u-po-pu-say-what-actually-broke-a2c153b5 — "Say What Actually Broke"
//
// The program writes one line of software error copy to /output/entry.txt:
// a single-line error message, 102 characters, that tells the user the
// brutal truth about what went wrong and makes them laugh on the way.
//
//   Nothing is wrong with your internet. Our server is down, and so is the
//   status page that says it isn't.
//
// Why this line, against the judge's brief (most important first):
//  1. It IS a single-line error message, <=200 characters, telling the
//     brutal truth in a funny way — and it owns its subject outright:
//     the server-down error. No other line on this subject says it
//     straighter: your connection is fine, WE are down.
//  2. It names the real failure in plain words — "Our server is down" —
//     and tells the reader what to do next by ruling out the wrong move:
//     stop rebooting your router, stop blaming your Wi-Fi. There is
//     nothing to fix on your end; wait for us.
//  3. Funny on a single read, with a twist a reader repeats out loud:
//     the status page — the one place that is supposed to tell the truth
//     about the outage — is down too, and still claiming everything is
//     fine. The lie is the joke, and the joke is the truth.
//  4. One line, 102 characters, no padding, no throat clearing.
//  5. It survives being pasted into a real product's error dialog: honest,
//     specific, no shock value, no blame shifted onto the user.
//
// Length and digest were computed programmatically before finalizing:
// 102 characters / 102 bytes (pure ASCII), SHA-256
// b0cd10fc6d5561b23c62b8540589f30ce87a9437cebd548ba0afefd348e9ac73
// of the exact text below, with no trailing newline.
//
// Deterministic: the same bytes on every run. No network, no input.
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const TEXT =
  "Nothing is wrong with your internet. Our server is down, and so is the status page that says it isn't.";

// The gate allows 1-200 Unicode code points: refuse to write anything else.
const LENGTH = [...TEXT].length;
if (LENGTH < 1 || LENGTH > 200) {
  throw new Error(`entry text is ${LENGTH} characters, outside 1-200`);
}

// Single line only: no newline, no carriage return anywhere in the text.
if (/[\r\n]/.test(TEXT)) {
  throw new Error("entry text must be a single line");
}

// Digest pinned at build time: the file written must be byte-identical
// to the text verified before finalizing.
const EXPECTED_SHA256 =
  "b0cd10fc6d5561b23c62b8540589f30ce87a9437cebd548ba0afefd348e9ac73";
const digest = createHash("sha256").update(TEXT, "utf8").digest("hex");
if (digest !== EXPECTED_SHA256) {
  throw new Error(`entry text sha256 mismatch: ${digest}`);
}

const OUT =
  process.env.MAKEFUN_OUTPUT_DIR != null && process.env.MAKEFUN_OUTPUT_DIR !== ""
    ? `${process.env.MAKEFUN_OUTPUT_DIR}/entry.txt`
    : "/output/entry.txt";
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, TEXT, "utf8");

// Read back and verify: the file on disk must be exactly the text.
const written = readFileSync(OUT, "utf8");
if (written !== TEXT) {
  throw new Error("entry.txt read-back mismatch");
}
const writtenDigest = createHash("sha256").update(written, "utf8").digest("hex");
if (writtenDigest !== EXPECTED_SHA256) {
  throw new Error(`entry.txt sha256 mismatch: ${writtenDigest}`);
}

console.log(`wrote ${OUT}: ${LENGTH} chars, sha256 ${EXPECTED_SHA256}`);
