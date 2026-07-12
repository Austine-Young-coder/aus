import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const TIERS = [
  { suffix: 'mobile', width: 1280, height: 720, quality: 72 },
  { suffix: 'desktop', width: 1920, height: 1080, quality: 78 },
];

const SOURCES = ['frames_1', 'frames_2'];

async function run() {
  for (const source of SOURCES) {
    const files = (await readdir(source)).filter((f) => f.endsWith('.jpg')).sort();

    for (const tier of TIERS) {
      const outDir = `${source}_${tier.suffix}`;
      await mkdir(outDir, { recursive: true });

      for (const file of files) {
        await sharp(join(source, file))
          .resize({ width: tier.width, height: tier.height, fit: 'inside' })
          .jpeg({ quality: tier.quality })
          .toFile(join(outDir, file));
      }

      console.log(`${outDir}: wrote ${files.length} files`);
    }
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
