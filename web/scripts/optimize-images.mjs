// One-time / idempotent image optimizer.
//
// Walks public/photos/<section>/ and, for any image that is wider than
// MAX_WIDTH or larger than MAX_BYTES on disk, re-encodes it to JPEG (or PNG
// for PNG sources) at quality QUALITY, capped at MAX_WIDTH wide.
//
// Already-optimized images are skipped, so this script is safe to run
// repeatedly and as part of prebuild.

import { readdirSync, statSync, readFileSync, writeFileSync, renameSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PHOTOS_DIR = join(ROOT, "public", "photos");

const MAX_WIDTH = 2000;       // any image wider than this gets resized
const MAX_BYTES = 700_000;    // any image bigger than this gets recompressed
const QUALITY = 82;
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const s = statSync(full);
    if (s.isDirectory()) yield* walk(full);
    else if (IMAGE_EXTS.has(extname(name).toLowerCase())) yield { full, size: s.size };
  }
}

async function processOne(file) {
  const ext = extname(file.full).toLowerCase();
  const buf = readFileSync(file.full);
  const meta = await sharp(buf).metadata();
  const width = meta.width ?? 0;

  const tooWide = width > MAX_WIDTH;
  const tooBig = file.size > MAX_BYTES;
  if (!tooWide && !tooBig) return { skipped: true };

  let pipeline = sharp(buf).rotate(); // auto-orient via EXIF
  if (tooWide) pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });

  if (ext === ".png") {
    pipeline = pipeline.png({ compressionLevel: 9, palette: true });
  } else {
    pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
  }

  const out = await pipeline.toBuffer();

  // Atomic write: write to .tmp then rename.
  const tmp = file.full + ".tmp";
  writeFileSync(tmp, out);
  renameSync(tmp, file.full);

  return {
    skipped: false,
    before: file.size,
    after: out.length,
    width,
    newWidth: tooWide ? MAX_WIDTH : width,
  };
}

async function main() {
  const all = [...walk(PHOTOS_DIR)];
  let processed = 0;
  let savedBytes = 0;
  let skipped = 0;

  for (const file of all) {
    try {
      const r = await processOne(file);
      if (r.skipped) {
        skipped++;
        continue;
      }
      processed++;
      savedBytes += r.before - r.after;
      const rel = file.full.replace(ROOT + "/", "");
      console.log(
        `[opt] ${rel}  ${(r.before / 1024).toFixed(0)}KB → ${(r.after / 1024).toFixed(
          0
        )}KB  (${r.width}px → ${r.newWidth}px)`
      );
    } catch (err) {
      console.warn(`[opt] failed ${file.full}: ${err.message}`);
    }
  }

  console.log(
    `[opt] done. processed=${processed} skipped=${skipped} saved=${(
      savedBytes / 1024 / 1024
    ).toFixed(1)}MB`
  );
}

main();
