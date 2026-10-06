// One-off asset generator — not part of the regular build. Run after `node .site/build.mjs`:
//   PW=/path/to/node_modules/playwright/index.mjs node .site/og.mjs   (or with `playwright` installed in the repo)
// Open Graph / social images, 1200×630 JPG, one per page (language-neutral, no copy): the page's hero image
// (or article cover) darkened, with the INFINIT© wordmark (bold ©) at the bottom left — the v3 look.
// Files: assets/site/og/<page key>.jpg ("j:<slug>" → "j-<slug>.jpg"). layout.mjs picks them up per page.
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROUTES, wm, ogName } from './lib.mjs';
import './jdata.mjs'; // adds the article routes

const { chromium } = await import(process.env.PW || 'playwright');
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
// Pages without a hero image (light headers) use one from the work.
// Screenshot covers (text under the wordmark) use a photo instead.
const FALLBACK = { 'j:website-first-meeting': 'project/assets/images/ipad-sunset.webp', sectors: 'project/assets/imagery/mountains-tekapo.webp', workidx: 'project/assets/images/Bunnker Final.webp', journal: 'project/assets/imagery/industrial-machine.webp' };

const hero = key => {
  if (FALLBACK[key]) return FALLBACK[key];
  const html = readFileSync(join(ROOT, 'en', ROUTES[key], 'index.html'), 'utf8');
  const m = html.match(/<img [^>]*src="([^"]+)"[^>]*fetchpriority="high"/) || html.match(/<img [^>]*fetchpriority="high"[^>]*src="([^"]+)"/);
  return m ? decodeURIComponent(m[1].replace(/^\//, '')) : FALLBACK.sectors;
};

const MIME = { webp: 'image/webp', jpg: 'image/jpeg', avif: 'image/avif', png: 'image/png' };
const font = readFileSync(join(ROOT, 'assets/site/fonts/Geist-900.woff2')).toString('base64');
const card = img => `<!doctype html><html><head><style>
@font-face{font-family:Geist;src:url(data:font/woff2;base64,${font}) format("woff2");font-weight:900}
*{margin:0;box-sizing:border-box}html,body{width:1200px;height:630px;overflow:hidden;background:#060a0e}
.bg{position:absolute;inset:0;background:url("data:${MIME[img.split('.').pop()]};base64,${readFileSync(join(ROOT, img)).toString('base64')}") center/cover}
.bg::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(6,10,14,.25),rgba(6,10,14,.1) 35%,rgba(6,10,14,.72))}
.wm{position:absolute;left:56px;bottom:52px;width:560px;height:auto;fill:#fff;color:#fff}
</style></head><body><div class="bg"></div>${wm('fit').replace('class="wm wm-fit"', 'class="wm"')}</body></html>`;

mkdirSync(join(ROOT, 'assets/site/og'), { recursive: true });
const b = await chromium.launch({ executablePath: process.env.CHR || undefined });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
let n = 0;
for (const key of Object.keys(ROUTES)) {
  if (!existsSync(join(ROOT, 'en', ROUTES[key], 'index.html'))) continue;
  await p.setContent(card(hero(key)), { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: join(ROOT, 'assets/site/og', ogName(key) + '.jpg'), type: 'jpeg', quality: 80 });
  n++;
}
await b.close();
console.log(`og images: ${n}`);
