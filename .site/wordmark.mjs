// One-off generator for the INFINIT© wordmark as SVG outlines (needs `opentype.js`: npm i opentype.js).
//   node .site/wordmark.mjs <path-to geist-latin-900-normal.woff> <path-to geist-latin-500-normal.woff>
// Writes .site/wordmark.json, which the build inlines as <svg> (no runtime measuring → no gaps between letters).
// Geometry follows the prototype's wm(): letters in Geist 900 placed by their ink box with a .035em gap;
// © in Geist 500 at .2em (large) or .42em (small, ≤80px), .1em after the T, top-aligned to the caps.
import opentype from 'opentype.js';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const [f900, f500] = process.argv.slice(2).map(p => opentype.parse(readFileSync(p).buffer.slice(0)));
const S = 100, GAP = .035;                       // build at font-size 100 → 1 unit = .01em
const r = n => Math.round(n * 100) / 100;
const pathAt = (font, ch, x, size) => font.charToGlyph(ch).getPath(x, 0, size);

let x = 0, top = 0;
const letters = [...'INFINIT'].map((ch, i) => {
  const bb = pathAt(f900, ch, 0, S).getBoundingBox();     // ink box at origin
  if (i) x += GAP * S;
  const p = pathAt(f900, ch, x - bb.x1, S);
  top = Math.min(top, bb.y1);
  x += bb.x2 - bb.x1;
  return p.toPathData(2);
});
const capTop = top;                                       // negative (SVG y grows down)
const variant = rs => {
  const size = rs * S, cb = pathAt(f500, '©', 0, size).getBoundingBox();
  const cx = x + .1 * size;                               // span margin-left .1em of the © size
  const p = pathAt(f500, '©', cx - cb.x1, size);         // ink starts at the margin
  p.commands.forEach(c => { for (const k of ['y', 'y1', 'y2']) if (k in c) c[k] += capTop - cb.y1; });
  const right = cx + (cb.x2 - cb.x1);
  return { w: r(right), c: p.toPathData(2) };
};
const out = { h: r(-capTop), top: r(capTop), letters, lg: variant(.2), sm: variant(.42) };
writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'wordmark.json'), JSON.stringify(out));
console.log('wordmark.json', { h: out.h, wLarge: out.lg.w, wSmall: out.sm.w });
