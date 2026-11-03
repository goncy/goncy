// Shared, dependency-free helpers used by both generators:
// - scripts/build-assets.mjs (run locally, output committed to assets/)
// - scripts/generate-stats.mjs (run daily by GitHub Actions, output on the `output` branch)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const ASSETS = path.join(ROOT, 'assets');

export const ACCENT = '#70c8ff';

export const THEMES = {
  dark: {
    name: 'dark',
    bg: '#0a0a0a',
    tile: '#111111',
    border: '#262626',
    grid: '#1c1c1c',
    text: '#ededed',
    muted: '#a1a1a1',
    faint: '#6e6e6e',
    accent: ACCENT,
    accentInk: ACCENT,
  },
  light: {
    name: 'light',
    bg: '#ffffff',
    tile: '#fafafa',
    border: '#e5e5e5',
    grid: '#f0f0f0',
    text: '#0a0a0a',
    muted: '#666666',
    faint: '#a1a1a1',
    accent: ACCENT,
    accentInk: '#1a9be0',
  },
};

export const SANS = "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
export const MONO = "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

export const esc = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Fonts are Latin subsets committed by build-assets, so the daily Action needs no npm install.
const FONT_FILES = {
  'sans-400': ['Geist', 400, 'geist-regular.woff2'],
  'sans-500': ['Geist', 500, 'geist-medium.woff2'],
  'sans-600': ['Geist', 600, 'geist-semibold.woff2'],
  'mono-400': ['Geist Mono', 400, 'geist-mono-regular.woff2'],
};

export const fontSourceFile = (key) => FONT_FILES[key][2];

// `overrides` lets build-assets pass per-SVG subsets (smaller files) instead of the committed Latin subsets.
export function fontCss(keys, overrides = {}) {
  return keys
    .map((key) => {
      const [family, weight, file] = FONT_FILES[key];
      const buffer = overrides[key] ?? fs.readFileSync(path.join(ASSETS, 'fonts', file));
      const data = buffer.toString('base64');
      return `@font-face{font-family:'${family}';font-weight:${weight};font-style:normal;src:url(data:font/woff2;base64,${data}) format('woff2')}`;
    })
    .join('\n');
}

export const BASE_CSS = `
.fade-up{opacity:0;animation:fade-up .7s cubic-bezier(.2,.7,.2,1) forwards}
@keyframes fade-up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.shimmer{animation:shimmer 6s ease-in-out infinite}
@keyframes shimmer{0%{transform:translateX(-160px)}55%,100%{transform:translateX(var(--shimmer-end))}}
.pulse{animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
@media (prefers-reduced-motion: reduce){*{animation:none!important;opacity:1!important}}
`;

export function svgDoc({ width, height, title, css = '', defs = '', body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title">
<title id="title">${esc(title)}</title>
<style>
${css}
</style>
<defs>${defs}</defs>
${body}
</svg>
`;
}

// Icons are normalized single-path SVGs in assets/icons, written by build-assets.
export function icon(name) {
  const raw = fs.readFileSync(path.join(ASSETS, 'icons', `${name}.svg`), 'utf8');
  const [, vbW, vbH] = raw.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  const [, d] = raw.match(/ d="([^"]+)"/);
  return { w: Number(vbW), h: Number(vbH), d };
}

export function iconAt(name, { x, y, size, fill }) {
  const { w, h, d } = icon(name);
  const scale = size / Math.max(w, h);
  const dx = x + (size - w * scale) / 2;
  const dy = y + (size - h * scale) / 2;
  return `<path transform="translate(${dx.toFixed(2)} ${dy.toFixed(2)}) scale(${scale.toFixed(4)})" d="${d}" fill="${fill}"/>`;
}

export function arrowUpRight({ x, y, size = 14, stroke }) {
  const s = size;
  return `<path d="M${x + s * 0.25} ${y + s * 0.75} L${x + s * 0.75} ${y + s * 0.25} M${x + s * 0.32} ${y + s * 0.25} H${x + s * 0.75} V${y + s * 0.68}" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`;
}

export function star({ cx, cy, r, fill }) {
  const points = [];
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? r : r * 0.45;
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    points.push(`${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`);
  }
  return `<polygon points="${points.join(' ')}" fill="${fill}"/>`;
}

export const formatNumber = (n) => {
  if (n >= 10000) return `${Math.round(n / 1000)}k`;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return String(n);
};

// Approximate word wrap for Geist at a given size (average glyph width ~0.53em).
export function wrap(text, { fontSize, maxWidth, maxLines = 2 }) {
  const maxChars = Math.floor(maxWidth / (fontSize * 0.53));
  const lines = [];
  let line = '';
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = `${kept[maxLines - 1].replace(/[.,;:]?$/, '')}…`;
    return kept;
  }
  return lines;
}

// Card frame with a soft accent shimmer travelling along the top edge.
export function cardFrame({ t, width, height, rx = 12, shimmerDelay = 0, id = 'card' }) {
  const defs = `
<linearGradient id="${id}-shimmer" x1="0" x2="1" y1="0" y2="0">
  <stop offset="0" stop-color="${t.accent}" stop-opacity="0"/>
  <stop offset=".5" stop-color="${t.accent}" stop-opacity=".9"/>
  <stop offset="1" stop-color="${t.accent}" stop-opacity="0"/>
</linearGradient>
<clipPath id="${id}-clip"><rect x="0" y="0" width="${width}" height="${height}" rx="${rx}"/></clipPath>`;
  const body = `
<rect x=".5" y=".5" width="${width - 1}" height="${height - 1}" rx="${rx}" fill="${t.bg}" stroke="${t.border}"/>
<g clip-path="url(#${id}-clip)">
  <rect class="shimmer" style="--shimmer-end:${width + 160}px;animation-delay:${shimmerDelay}s" x="0" y="0" width="160" height="1.5" fill="url(#${id}-shimmer)"/>
</g>`;
  return { defs, body };
}

// Link card used for repos (live stars) and for the Twitch card.
// `meta(y)` returns the bottom row markup for a given baseline.
export function linkCard({ t, title, description, iconName, meta, width = 412, height = 148, shimmerDelay = 0, fonts = {} }) {
  const frame = cardFrame({ t, width, height, shimmerDelay });
  const lines = wrap(description, { fontSize: 14, maxWidth: width - 48 });
  const desc = lines
    .map((line, i) => `<text x="24" y="${76 + i * 21}" class="desc">${esc(line)}</text>`)
    .join('');
  const css = `${fontCss(['sans-400', 'sans-600', 'mono-400'], fonts)}
${BASE_CSS}
.title{font:600 17px ${SANS};fill:${t.text};letter-spacing:-.2px}
.desc{font:400 14px ${SANS};fill:${t.muted}}
.meta{font:400 12.5px ${MONO};fill:${t.muted}}`;
  const body = `${frame.body}
<g class="fade-up">
  ${iconAt(iconName, { x: 24, y: 28, size: 18, fill: t.text })}
  <text x="52" y="43" class="title">${esc(title)}</text>
  ${arrowUpRight({ x: width - 38, y: 28, size: 16, stroke: t.faint })}
</g>
<g class="fade-up" style="animation-delay:.1s">${desc}</g>
<g class="fade-up" style="animation-delay:.2s">${meta(height - 24)}</g>`;
  return svgDoc({ width, height, title: `${title}: ${description}`, css, defs: frame.defs, body });
}

export function writeAsset(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  return file;
}
