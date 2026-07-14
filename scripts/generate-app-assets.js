const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'app-assets');
fs.mkdirSync(OUT, { recursive: true });

function buildMapGrid({
  width = 80,
  fine = 4,
  major = 16,
  color = '#f6f5f0',
  fineOpacity = 0.07,
  majorOpacity = 0.16,
  fineStroke = 0.18,
  majorStroke = 0.35,
}) {
  let lines = '';
  for (let x = fine; x < width; x += fine) {
    if (x % major === 0) continue;
    lines += `<line x1="${x}" y1="0" x2="${x}" y2="${width}" stroke="${color}" stroke-opacity="${fineOpacity}" stroke-width="${fineStroke}"/>`;
  }
  for (let y = fine; y < width; y += fine) {
    if (y % major === 0) continue;
    lines += `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="${color}" stroke-opacity="${fineOpacity}" stroke-width="${fineStroke}"/>`;
  }
  for (let x = major; x < width; x += major) {
    lines += `<line x1="${x}" y1="0" x2="${x}" y2="${width}" stroke="${color}" stroke-opacity="${majorOpacity}" stroke-width="${majorStroke}"/>`;
  }
  for (let y = major; y < width; y += major) {
    lines += `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="${color}" stroke-opacity="${majorOpacity}" stroke-width="${majorStroke}"/>`;
  }
  return lines;
}

function buildIntersectionDots({ width = 80, spacing = 16, radius = 0.55, color = '#f6f5f0', opacity = 0.35 }) {
  let dots = '';
  for (let x = spacing; x < width; x += spacing) {
    for (let y = spacing; y < width; y += spacing) {
      dots += `<circle cx="${x}" cy="${y}" r="${radius}" fill="${color}" fill-opacity="${opacity}"/>`;
    }
  }
  return dots;
}

const MAP_GRID_80 = buildMapGrid({ width: 80 });
const MAP_DOTS_80 = buildIntersectionDots({ width: 80 });

const ICON_SVG = `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="sheen" cx="30%" cy="22%" r="85%">
      <stop offset="0%" stop-color="#1a2742" stop-opacity="1"/>
      <stop offset="60%" stop-color="#0b1220" stop-opacity="1"/>
      <stop offset="100%" stop-color="#070b15" stop-opacity="1"/>
    </radialGradient>
    <radialGradient id="vignette" cx="50%" cy="50%" r="68%">
      <stop offset="50%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.45"/>
    </radialGradient>
    <radialGradient id="gridMask" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#fff" stop-opacity="1"/>
      <stop offset="70%" stop-color="#fff" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0.15"/>
    </radialGradient>
    <linearGradient id="accentDot" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1e4d92"/>
    </linearGradient>
    <linearGradient id="route" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0"/>
      <stop offset="50%" stop-color="#3b82f6" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
    </linearGradient>
    <mask id="fadeMask">
      <rect width="80" height="80" fill="url(#gridMask)"/>
    </mask>
    <clipPath id="rounded"><rect width="80" height="80" rx="18"/></clipPath>
  </defs>
  <g clip-path="url(#rounded)">
    <rect width="80" height="80" fill="url(#sheen)"/>
    <g mask="url(#fadeMask)">
      ${MAP_GRID_80}
      ${MAP_DOTS_80}
    </g>
    <path d="M6 64 Q 30 50 44 56 T 76 38" stroke="url(#route)" stroke-width="0.8" fill="none" stroke-linecap="round"/>
    <rect width="80" height="80" fill="url(#vignette)"/>
    <path d="M24 18 L24 60" stroke="#f6f5f0" stroke-width="7" stroke-linecap="round"/>
    <path d="M24 18 C24 18 46 18 46 18 C54 18 60 24 60 32 C60 40 54 46 46 46 L24 46" stroke="#f6f5f0" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="58" cy="58" r="6.2" fill="#3b82f6" fill-opacity="0.18"/>
    <circle cx="58" cy="58" r="5.2" fill="url(#accentDot)"/>
    <circle cx="56.5" cy="56.5" r="1.4" fill="#ffffff" fill-opacity="0.6"/>
  </g>
</svg>`;

const ADAPTIVE_FG_SVG = `<svg viewBox="0 0 108 108" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="accentDot2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1e4d92"/>
    </linearGradient>
  </defs>
  <g transform="translate(14 14)">
    <path d="M24 18 L24 60" stroke="#f6f5f0" stroke-width="7" stroke-linecap="round"/>
    <path d="M24 18 C24 18 46 18 46 18 C54 18 60 24 60 32 C60 40 54 46 46 46 L24 46" stroke="#f6f5f0" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="58" cy="58" r="5.2" fill="url(#accentDot2)"/>
    <circle cx="56.5" cy="56.5" r="1.4" fill="#ffffff" fill-opacity="0.55"/>
  </g>
</svg>`;

async function rasterIcon(size, outFile) {
  await sharp(Buffer.from(ICON_SVG))
    .resize(size, size)
    .png()
    .toFile(path.join(OUT, outFile));
  console.log('wrote', outFile, size + 'x' + size);
}

async function rasterSplash(size, outFile) {
  const splashGrid = buildMapGrid({
    width: 200,
    fine: 8,
    major: 40,
    fineOpacity: 0.05,
    majorOpacity: 0.11,
    fineStroke: 0.25,
    majorStroke: 0.55,
  });
  const splashDots = buildIntersectionDots({ width: 200, spacing: 40, radius: 0.9, opacity: 0.28 });
  const SPLASH_BG_SVG = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="bg" cx="50%" cy="42%" r="75%">
        <stop offset="0%" stop-color="#15203a"/>
        <stop offset="55%" stop-color="#0b1220"/>
        <stop offset="100%" stop-color="#060912"/>
      </radialGradient>
      <radialGradient id="gridFade" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#fff" stop-opacity="1"/>
        <stop offset="65%" stop-color="#fff" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#fff" stop-opacity="0.05"/>
      </radialGradient>
      <linearGradient id="splashRoute" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3b82f6" stop-opacity="0"/>
        <stop offset="50%" stop-color="#3b82f6" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
      </linearGradient>
      <mask id="splashFade">
        <rect width="200" height="200" fill="url(#gridFade)"/>
      </mask>
    </defs>
    <rect width="200" height="200" fill="url(#bg)"/>
    <g mask="url(#splashFade)">
      ${splashGrid}
      ${splashDots}
    </g>
    <path d="M10 150 Q 70 110 100 130 T 190 70" stroke="url(#splashRoute)" stroke-width="1" fill="none" stroke-linecap="round"/>
  </svg>`;

  const bgPng = await sharp(Buffer.from(SPLASH_BG_SVG))
    .resize(size, size)
    .png()
    .toBuffer();

  const iconSize = Math.round(size * 0.30);
  const ICON_FG_SVG = `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="acc" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3b82f6"/>
        <stop offset="100%" stop-color="#1e4d92"/>
      </linearGradient>
    </defs>
    <path d="M24 18 L24 60" stroke="#f6f5f0" stroke-width="7" stroke-linecap="round"/>
    <path d="M24 18 C24 18 46 18 46 18 C54 18 60 24 60 32 C60 40 54 46 46 46 L24 46" stroke="#f6f5f0" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="58" cy="58" r="5.2" fill="url(#acc)"/>
    <circle cx="56.5" cy="56.5" r="1.4" fill="#ffffff" fill-opacity="0.55"/>
  </svg>`;

  const iconPng = await sharp(Buffer.from(ICON_FG_SVG))
    .resize(iconSize, iconSize)
    .png()
    .toBuffer();

  await sharp(bgPng)
    .composite([{ input: iconPng, gravity: 'center' }])
    .png()
    .toFile(path.join(OUT, outFile));
  console.log('wrote', outFile, size + 'x' + size);
}

async function rasterAdaptiveFg(size, outFile) {
  await sharp(Buffer.from(ADAPTIVE_FG_SVG))
    .resize(size, size)
    .png()
    .toFile(path.join(OUT, outFile));
  console.log('wrote', outFile, size + 'x' + size);
}

(async () => {
  await rasterIcon(1024, 'icon.png');
  await rasterAdaptiveFg(1024, 'adaptive-icon.png');
  await rasterIcon(48, 'favicon.png');
  await rasterSplash(2732, 'splash.png');
  console.log('done -> ' + OUT);
})();
