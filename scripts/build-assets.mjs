// Builds the static, committed assets in assets/.
// Run with `npm run build:assets` after changing titles, links, stack or colors.
import fs from 'node:fs';
import path from 'node:path';
import subsetFont from 'subset-font';
import * as simpleIcons from 'simple-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
  ROOT, ASSETS, THEMES, SANS, MONO, BASE_CSS, esc, fontCss, fontSourceFile, svgDoc, iconAt, arrowUpRight, writeAsset,
} from './lib/svg.mjs';

// `geist` does not export its font files, so read them from node_modules directly.
const geistDir = path.join(ROOT, 'node_modules/geist/dist/fonts');

// ---------------------------------------------------------------- content

const HERO = {
  name: 'Gonzalo Pozzo',
  tagline: 'Helping devs land their first (or a better) job in IT.',
  titles: ['Forward Deployed Engineer ▲ Vercel', 'GitHub Star', 'v0 Ambassador', 'Cypress Ambassador', 'Twitch Partner'],
};

const SOCIALS = [
  { id: 'x', label: 'X' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'twitch', label: 'Twitch' },
  { id: 'instagram', label: 'Instagram' },
];

const STACK = [
  { id: 'nextdotjs', label: 'Next.js' },
  { id: 'react', label: 'React' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'tailwindcss', label: 'Tailwind CSS' },
  { id: 'vercel', label: 'Vercel' },
  { id: 'aisdk', label: 'AI SDK' },
  { id: 'v0', label: 'v0' },
];

// ---------------------------------------------------------------- fonts

const FONT_SOURCES = {
  'geist-regular.woff2': 'geist-sans/Geist-Regular.woff2',
  'geist-medium.woff2': 'geist-sans/Geist-Medium.woff2',
  'geist-semibold.woff2': 'geist-sans/Geist-SemiBold.woff2',
  'geist-mono-regular.woff2': 'geist-mono/GeistMono-Regular.woff2',
};

// Committed subsets (used by the daily Action): Basic Latin plus a few symbols and Spanish letters.
let charset = '';
for (let c = 0x20; c <= 0x7e; c++) charset += String.fromCharCode(c);
charset += '▲·…–—’“”•áéíóúñÁÉÍÓÚÑü';

const fontSource = (file) => fs.readFileSync(path.join(geistDir, FONT_SOURCES[file]));
for (const out of Object.keys(FONT_SOURCES)) {
  writeAsset(path.join(ASSETS, 'fonts', out), await subsetFont(fontSource(out), charset, { targetFormat: 'woff2' }));
}

// Static assets get per-file subsets: render once, collect the characters used, subset, render again.
const FONT_KEYS = ['sans-400', 'sans-500', 'sans-600', 'mono-400'];
const decode = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
async function optimized(render) {
  const draft = render({});
  const used = [...draft.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => decode(m[1])).join('');
  const chars = [...new Set(used + ' ')].join('');
  const fonts = {};
  for (const key of FONT_KEYS) {
    fonts[key] = await subsetFont(fontSource(fontSourceFile(key)), chars, { targetFormat: 'woff2' });
  }
  return render(fonts);
}

// ---------------------------------------------------------------- icons

const iconSvg = (w, h, d) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><path d="${d}"/></svg>\n`;
const SIMPLE = {
  nextdotjs: 'siNextdotjs', react: 'siReact', typescript: 'siTypescript', tailwindcss: 'siTailwindcss',
  vercel: 'siVercel', v0: 'siV0', x: 'siX', youtube: 'siYoutube', twitch: 'siTwitch',
  instagram: 'siInstagram', github: 'siGithub',
};
for (const [id, key] of Object.entries(SIMPLE)) {
  writeAsset(path.join(ASSETS, 'icons', `${id}.svg`), iconSvg(24, 24, simpleIcons[key].path));
}
const [liW, liH, , , liPath] = faLinkedin.icon;
writeAsset(path.join(ASSETS, 'icons', 'linkedin.svg'), iconSvg(liW, liH, liPath));
// AI SDK has no official glyph: use a sparkle.
writeAsset(
  path.join(ASSETS, 'icons', 'aisdk.svg'),
  iconSvg(24, 24, 'M12 1.5c.7 5.9 4.6 9.8 10.5 10.5-5.9.7-9.8 4.6-10.5 10.5-.7-5.9-4.6-9.8-10.5-10.5C7.4 11.3 11.3 7.4 12 1.5Z'),
);

// ---------------------------------------------------------------- hero

function typingAnimation(t, { x0, y, fontSize }) {
  const cw = fontSize * 0.6; // Geist Mono advance is exactly 600/1000 em, including ▲.
  const TYPE = 0.065, DELETE = 0.025, HOLD = 1.9, GAP = 0.35;
  let time = 0.6;
  const slots = HERO.titles.map((title) => {
    const n = [...title].length;
    const start = time;
    const holdEnd = start + n * TYPE + HOLD;
    time = holdEnd + n * DELETE + GAP;
    const events = [];
    for (let k = 1; k <= n; k++) events.push([start + k * TYPE, k]);
    for (let k = 1; k <= n; k++) events.push([holdEnd + k * DELETE, n - k]);
    return { title, events };
  });
  const total = time;
  const anim = (attr, events, map) => {
    const all = [[0, 0], ...events];
    const keyTimes = all.map(([s]) => (s / total).toFixed(5)).join(';');
    const values = all.map(([, k]) => map(k)).join(';');
    return `<animate attributeName="${attr}" dur="${total.toFixed(3)}s" repeatCount="indefinite" calcMode="discrete" keyTimes="${keyTimes}" values="${values}"/>`;
  };
  const texts = slots
    .map(({ title, events }, i) => `
  <clipPath id="type-${i}"><rect x="${x0}" y="${y - fontSize - 6}" width="0" height="${fontSize + 14}">${anim('width', events, (k) => (k * cw).toFixed(2))}</rect></clipPath>
  <text x="${x0}" y="${y}" class="type" clip-path="url(#type-${i})" xml:space="preserve">${esc(title)}</text>`)
    .join('');
  const cursorEvents = slots.flatMap(({ events }) => events);
  const cursor = `<rect class="blink" x="${x0}" y="${y - fontSize + 2}" width="${(cw * 0.75).toFixed(2)}" height="${fontSize + 3}" rx="1.5" fill="${t.accent}">${anim('x', cursorEvents, (k) => (x0 + k * cw).toFixed(2))}</rect>`;
  return texts + cursor;
}

function hero(t, fonts) {
  const W = 840, H = 300;
  const photo = fs.readFileSync(path.join(ASSETS, 'photo-hero.jpg')).toString('base64');
  const px = 40, py = 58, ps = 184;
  const tx = 264;
  const css = `${fontCss(['sans-400', 'sans-600', 'mono-400'], fonts)}
${BASE_CSS}
.name{font:600 52px ${SANS};fill:${t.text};letter-spacing:-2px}
.prompt{font:400 21px ${MONO};fill:${t.faint}}
.type{font:400 21px ${MONO};fill:${t.text}}
.tagline{font:400 16px ${SANS};fill:${t.muted}}
.blink{animation:blink 1.1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
.beam-h{animation:beam-h 7s linear infinite}
@keyframes beam-h{from{transform:translateX(-140px)}to{transform:translateX(${W}px)}}
.beam-v{animation:beam-v 9s linear infinite 2.5s;transform:translateY(-120px)}
@keyframes beam-v{from{transform:translateY(-120px)}to{transform:translateY(${H}px)}}
.glow{animation:glow 6s ease-in-out infinite}
@keyframes glow{0%,100%{opacity:.55}50%{opacity:1}}`;
  const defs = `
<clipPath id="card"><rect x="0" y="0" width="${W}" height="${H}" rx="14"/></clipPath>
<clipPath id="photo"><rect x="${px}" y="${py}" width="${ps}" height="${ps}" rx="16"/></clipPath>
<pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="${t.grid}" stroke-width="1"/></pattern>
<radialGradient id="fade" cx="78%" cy="20%" r="75%"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<mask id="grid-mask"><rect width="${W}" height="${H}" fill="url(#fade)"/></mask>
<radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${t.accent}" stop-opacity="${t.name === 'dark' ? 0.28 : 0.2}"/><stop offset="1" stop-color="${t.accent}" stop-opacity="0"/></radialGradient>
<linearGradient id="beam-h" x1="0" x2="1"><stop offset="0" stop-color="${t.accent}" stop-opacity="0"/><stop offset="1" stop-color="${t.accent}"/></linearGradient>
<linearGradient id="beam-v" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${t.accent}" stop-opacity="0"/><stop offset="1" stop-color="${t.accent}"/></linearGradient>`;
  const body = `
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="14" fill="${t.bg}" stroke="${t.border}"/>
<g clip-path="url(#card)">
  <rect width="${W}" height="${H}" fill="url(#grid)" mask="url(#grid-mask)"/>
  <rect class="beam-h" x="0" y="47.5" width="140" height="1" fill="url(#beam-h)"/>
  <rect class="beam-v" x="791.5" y="0" width="1" height="120" fill="url(#beam-v)"/>
  <circle class="glow" cx="${px + ps / 2}" cy="${py + ps / 2}" r="170" fill="url(#glow)"/>
</g>
<g class="fade-up">
  <image href="data:image/jpeg;base64,${photo}" x="${px}" y="${py}" width="${ps}" height="${ps}" clip-path="url(#photo)" preserveAspectRatio="xMidYMid slice"/>
  <rect x="${px + 0.5}" y="${py + 0.5}" width="${ps - 1}" height="${ps - 1}" rx="16" fill="none" stroke="${t.border}"/>
</g>
<g class="fade-up" style="animation-delay:.15s"><text x="${tx - 3}" y="126" class="name">${esc(HERO.name)}</text></g>
<g class="fade-up" style="animation-delay:.3s">
  <text x="${tx}" y="176" class="prompt">&gt;</text>
  ${typingAnimation(t, { x0: tx + 2 * 21 * 0.6, y: 176, fontSize: 21 })}
</g>
<g class="fade-up" style="animation-delay:.4s"><text x="${tx}" y="220" class="tagline">${esc(HERO.tagline)}</text></g>`;
  return svgDoc({
    width: W, height: H, css, defs, body,
    title: `${HERO.name} (goncy). ${HERO.titles.join(', ')}. ${HERO.tagline}`,
  });
}

// ---------------------------------------------------------------- social cards

function socialCard(t, { id, label }, index, fonts) {
  const W = 152, H = 44;
  const css = `${fontCss(['sans-500'], fonts)}
${BASE_CSS}
.label{font:500 14px ${SANS};fill:${t.text}}`;
  const body = `
<g class="fade-up" style="animation-delay:${(index * 0.06).toFixed(2)}s">
  <rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="10" fill="${t.bg}" stroke="${t.border}"/>
  ${iconAt(id, { x: 16, y: 14, size: 16, fill: t.text })}
  <text x="42" y="27" class="label">${esc(label)}</text>
  ${arrowUpRight({ x: W - 30, y: 15, size: 14, stroke: t.faint })}
</g>`;
  return svgDoc({ width: W, height: H, css, body, title: label });
}

// ---------------------------------------------------------------- stack

function stack(t, fonts) {
  const tileW = 112, tileH = 96, gap = 8;
  const W = STACK.length * tileW + (STACK.length - 1) * gap + 8, H = tileH + 8;
  const css = `${fontCss(['sans-500'], fonts)}
${BASE_CSS}
.label{font:500 13px ${SANS};fill:${t.muted}}`;
  const tiles = STACK.map(({ id, label }, i) => {
    const x = 4 + i * (tileW + gap);
    return `
<g class="fade-up" style="animation-delay:${(i * 0.07).toFixed(2)}s">
  <rect x="${x + 0.5}" y="4.5" width="${tileW - 1}" height="${tileH - 1}" rx="12" fill="${t.tile}" stroke="${t.border}"/>
  ${iconAt(id, { x: x + tileW / 2 - 14, y: 22, size: 28, fill: t.text })}
  <text x="${x + tileW / 2}" y="80" text-anchor="middle" class="label">${esc(label)}</text>
</g>`;
  }).join('');
  return svgDoc({ width: W, height: H, css, body: tiles, title: `Stack: ${STACK.map((s) => s.label).join(', ')}` });
}

// ---------------------------------------------------------------- write

const written = [];
for (const t of Object.values(THEMES)) {
  written.push(writeAsset(path.join(ASSETS, `hero-${t.name}.svg`), await optimized((f) => hero(t, f))));
  written.push(writeAsset(path.join(ASSETS, `stack-${t.name}.svg`), await optimized((f) => stack(t, f))));
  for (const [i, s] of SOCIALS.entries()) {
    written.push(writeAsset(path.join(ASSETS, 'social', `${s.id}-${t.name}.svg`), await optimized((f) => socialCard(t, s, i, f))));
  }
}
for (const file of written) console.log(`${(fs.statSync(file).size / 1024).toFixed(1).padStart(6)} KB  ${path.relative(process.cwd(), file)}`);
