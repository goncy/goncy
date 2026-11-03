// Generates the data-driven SVGs (stats card + repo cards with live stars).
// Runs daily in .github/workflows/profile.yml and is published to the `output` branch.
// Local run: GITHUB_TOKEN=$(gh auth token) node scripts/generate-stats.mjs dist
import path from 'node:path';
import {
  ROOT, THEMES, SANS, MONO, BASE_CSS, esc, fontCss, svgDoc, cardFrame, linkCard, star, formatNumber, writeAsset,
} from './lib/svg.mjs';

const USERNAME = process.env.USERNAME || 'goncy';
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const OUT = path.resolve(ROOT, process.argv[2] || 'dist');

// Repos featured in "Landing your first dev job?". Descriptions are written for the README.
const REPOS = [
  { name: 'interview-challenges', description: 'Algorithm, live-coding and take-home interview challenges, solved on stream.' },
  { name: 'nextjs-course', description: 'An introductory course to Next.js and the App Router.' },
  { name: 'aprender-en-tiempos-de-ia', description: 'Guide from my talk about learning to code in the age of AI.' },
];

if (!TOKEN) {
  console.error('Missing GITHUB_TOKEN (or GH_TOKEN).');
  process.exit(1);
}

async function graphql(query, variables) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `bearer ${TOKEN}`, 'Content-Type': 'application/json', 'User-Agent': `${USERNAME}-profile` },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (!res.ok || json.errors) throw new Error(`GitHub GraphQL failed: ${res.status} ${JSON.stringify(json.errors ?? json)}`);
  return json.data;
}

const QUERY = `query($login: String!, $after: String) {
  user(login: $login) {
    followers { totalCount }
    repositories(first: 100, after: $after, ownerAffiliations: OWNER, privacy: PUBLIC) {
      totalCount
      pageInfo { hasNextPage endCursor }
      nodes { name stargazerCount primaryLanguage { name } }
    }
    contributionsCollection {
      contributionCalendar { totalContributions weeks { contributionDays { contributionCount } } }
    }
  }
}`;

async function fetchUser() {
  let after = null;
  let first;
  const repos = [];
  do {
    const { user } = await graphql(QUERY, { login: USERNAME, after });
    first ??= user;
    repos.push(...user.repositories.nodes);
    after = user.repositories.pageInfo.hasNextPage ? user.repositories.pageInfo.endCursor : null;
  } while (after);
  const weeks = first.contributionsCollection.contributionCalendar.weeks.map((w) =>
    w.contributionDays.reduce((sum, d) => sum + d.contributionCount, 0),
  );
  return {
    followers: first.followers.totalCount,
    publicRepos: first.repositories.totalCount,
    stars: repos.reduce((sum, r) => sum + r.stargazerCount, 0),
    contributions: first.contributionsCollection.contributionCalendar.totalContributions,
    weeks,
    repos: Object.fromEntries(repos.map((r) => [r.name, r])),
  };
}

// Smooth line through points (Catmull-Rom converted to cubic Béziers).
function smoothPath(points) {
  let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

function statsCard(t, data, updated) {
  const W = 840, H = 248;
  const frame = cardFrame({ t, width: W, height: H, id: 'stats' });
  const metrics = [
    [formatNumber(data.followers), 'Followers'],
    [formatNumber(data.stars), 'Stars (all time)'],
    [formatNumber(data.publicRepos), 'Public repos'],
    [formatNumber(data.contributions), 'Contributions'],
  ];
  const metricsSvg = metrics
    .map(([value, label], i) => `
<g class="fade-up" style="animation-delay:${(0.1 + i * 0.08).toFixed(2)}s">
  <text x="${32 + i * 200}" y="100" class="value">${esc(value)}</text>
  <text x="${32 + i * 200}" y="124" class="label">${esc(label)}</text>
</g>`)
    .join('');

  const x0 = 32, x1 = W - 32, y0 = 172, y1 = 220;
  const max = Math.max(1, ...data.weeks);
  const step = (x1 - x0) / Math.max(1, data.weeks.length - 1);
  const points = data.weeks.map((v, i) => [x0 + i * step, y1 - (v / max) * (y1 - y0)]);
  const line = smoothPath(points);
  const area = `${line} L${x1} ${y1} L${x0} ${y1} Z`;
  const best = data.weeks.indexOf(max);
  const [bx, by] = points[best];
  const bestLabel = `best week: ${max}`;
  const labelX = Math.min(Math.max(bx, x0 + 50), x1 - 50);

  const defs = `${frame.defs}
<linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${t.accent}" stop-opacity=".28"/><stop offset="1" stop-color="${t.accent}" stop-opacity="0"/></linearGradient>`;
  const css = `${fontCss(['sans-400', 'sans-600', 'mono-400'])}
${BASE_CSS}
.eyebrow{font:400 11.5px ${MONO};fill:${t.faint};letter-spacing:1px}
.value{font:600 36px ${SANS};fill:${t.text};letter-spacing:-1.2px}
.label{font:400 13px ${SANS};fill:${t.muted}}
.best{font:400 11px ${MONO};fill:${t.muted}}
.line{stroke-dasharray:1;stroke-dashoffset:1;animation:draw 2.4s .5s cubic-bezier(.4,0,.2,1) forwards}
@keyframes draw{to{stroke-dashoffset:0}}
.area{opacity:0;animation:appear 1.2s 1.6s ease forwards}
.marker{opacity:0;animation:appear .6s 2.6s ease forwards}
@keyframes appear{to{opacity:1}}
@media (prefers-reduced-motion: reduce){.line{stroke-dashoffset:0}}`;
  const body = `${frame.body}
<text x="32" y="40" class="eyebrow">GITHUB ACTIVITY</text>
<text x="${W - 32}" y="40" text-anchor="end" class="eyebrow">LAST 12 MONTHS · UPDATED ${esc(updated.toUpperCase())}</text>
${metricsSvg}
<line x1="${x0}" y1="${y1 + 0.5}" x2="${x1}" y2="${y1 + 0.5}" stroke="${t.border}" stroke-dasharray="2 4"/>
<path class="area" d="${area}" fill="url(#area)"/>
<path class="line" d="${line}" pathLength="1" fill="none" stroke="${t.accentInk}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<g class="marker">
  <circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="7" fill="${t.accent}" opacity=".25" class="pulse"/>
  <circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="3.5" fill="${t.accentInk}"/>
  <text x="${labelX.toFixed(1)}" y="${(by - 12).toFixed(1)}" text-anchor="middle" class="best">${esc(bestLabel)}</text>
</g>`;
  return svgDoc({
    width: W, height: H, css, defs, body,
    title: `GitHub activity: ${metrics.map(([v, l]) => `${v} ${l.toLowerCase()}`).join(', ')} in the last 12 months.`,
  });
}

function repoCard(t, repo, { description }, index) {
  const language = repo.primaryLanguage?.name;
  const metaText = [formatNumber(repo.stargazerCount), language, 'in Spanish'].filter(Boolean).join(' · ');
  return linkCard({
    t,
    title: repo.name,
    description,
    iconName: 'github',
    shimmerDelay: index * 1.5,
    meta: (y) => `${star({ cx: 30, cy: y - 4.5, r: 6, fill: t.accentInk })}<text x="42" y="${y}" class="meta">${esc(metaText)}</text>`,
  });
}

const data = await fetchUser();
const updated = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
for (const t of Object.values(THEMES)) {
  writeAsset(path.join(OUT, `stats-${t.name}.svg`), statsCard(t, data, updated));
  REPOS.forEach((config, i) => {
    const repo = data.repos[config.name];
    if (!repo) throw new Error(`Repo ${USERNAME}/${config.name} not found or not public.`);
    writeAsset(path.join(OUT, `repo-${config.name}-${t.name}.svg`), repoCard(t, repo, config, i));
  });
}
console.log(`followers=${data.followers} stars=${data.stars} repos=${data.publicRepos} contributions=${data.contributions} weeks=${data.weeks.length}`);
console.log(`Wrote ${OUT}`);
