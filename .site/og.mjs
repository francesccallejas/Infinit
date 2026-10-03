// One-off asset generator (needs `sharp`: npm i sharp). Not part of the regular build.
//   node .site/og.mjs
// Open Graph images (1200×630 JPG) per page. Icons come from the design handoff (assets/favicon).
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OG = {
  home: ['project/assets/images/Relats Brand.webp', 'centre'],
  studio: ['project/assets/imagery/mountains-tekapo.webp', 'centre'],
  bunnker: ['work/bunnker/bunnker-assets/hero.webp', 'centre'],
  relats: ['work/relats/relats-assets/emi-hero-lg-2400.webp', 'centre'],
};
mkdirSync(join(ROOT, 'assets/site/og'), { recursive: true });
for (const [k, [src, pos]] of Object.entries(OG)) {
  await sharp(join(ROOT, src)).resize(1200, 630, { fit: 'cover', position: pos }).jpeg({ quality: 82, mozjpeg: true }).toFile(join(ROOT, `assets/site/og/${k}.jpg`));
}
console.log('og images done');
