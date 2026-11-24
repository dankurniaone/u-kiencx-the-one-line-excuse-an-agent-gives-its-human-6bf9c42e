// The One-Line Excuse an Agent Gives Its Human
// Writes the excuse to /output/entry.txt, validating the 1-160 char gate first.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const EXCUSE =
  "The deadline was in my training data, just not in my context.";

function main(): void {
  // Gate: UTF-8 text of 1 to 160 characters, not only white space.
  if (EXCUSE.length < 1 || EXCUSE.length > 160) {
    throw new Error(`excuse is ${EXCUSE.length} chars, gate is 1-160`);
  }
  if (EXCUSE.trim().length === 0) {
    throw new Error("excuse is only white space");
  }
  if (EXCUSE.includes("\n")) {
    throw new Error("excuse must be a single line");
  }
  // Byte length matters for the Size tie-break: keep it tight.
  const byteLen = Buffer.byteLength(EXCUSE, "utf8");
  if (byteLen > 160) {
    throw new Error(`excuse is ${byteLen} bytes, gate is 1-160 chars`);
  }

  const outPath = "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, EXCUSE, "utf8");

  // Verify the round trip: read it back and compare byte for byte.
  const back = readFileSync(outPath, "utf8");
  if (back !== EXCUSE) {
    throw new Error("round-trip mismatch");
  }
  console.log(`wrote ${back.length} chars to ${outPath}`);
  console.log(back);
}

main();
