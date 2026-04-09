import { readFile } from "node:fs/promises";
import { join } from "node:path";

let cached: ArrayBuffer | null = null;

export async function getInterBold(): Promise<ArrayBuffer> {
  if (cached) return cached;
  const buf = await readFile(join(process.cwd(), "public/fonts/inter-extrabold.ttf"));
  cached = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  return cached;
}
