// Shared helpers for the static build.
export const SITE = 'https://weareinfinit.com';
export const LANGS = ['en', 'ca', 'es'];
export const LOCALE = { en: 'en_GB', ca: 'ca_ES', es: 'es_ES' };
export const EMAIL = 'hello@weareinfinit.com';
export const PHONE = '+34 689 022 383';
export const LINKEDIN = 'https://www.linkedin.com/company/weareinfinit/';
export const INSTAGRAM = 'https://www.instagram.com/weareinfinit.studio/';

// Page routes (same slug in every language).
export const ROUTES = {
  home: '',
  studio: 'studio/',
  bunnker: 'work/bunnker/',
  relats: 'work/relats/',
};
export const url = (lang, page) => `/${lang}/${ROUTES[page]}`;
export const abs = (lang, page) => SITE + url(lang, page);

// Escape text for HTML.
export const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// Root-relative asset URL with each path segment encoded ("Bunnker Final.webp" → "Bunnker%20Final.webp").
export const A = p => '/' + p.split('/').map(encodeURIComponent).join('/');

// Service colour system (oklch, subtle).
export const dot = h => `oklch(.72 .05 ${h})`;
export const tint = h => `oklch(.92 .025 ${h})`;
export const strong = h => `oklch(.78 .08 ${h})`;

// The wordmark: real text for no-JS / SEO, rebuilt letter by letter (canvas-measured) by site.js.
export const wm = (size, extra = '') => `<span class="wm" data-wm="${size}" aria-hidden="true"${extra}>INFINIT<span class="r">©</span></span>`;

export const ARROW_X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
