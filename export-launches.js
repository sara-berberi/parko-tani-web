// Export each .slide in launches.html as a high-res PNG (1080x1920, Play Store spec).
// Run: node export-launches.js
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.join(__dirname, 'exported-launches');
const FILE_URL = 'file://' + path.join(__dirname, 'launches.html').replace(/\\/g, '/');

// Target store dimensions
const WIDTH = 1080;
const HEIGHT = 1920;
const SCALE = 2; // 2x deviceScaleFactor → effectively 2160x3840 render, downsampled crisp

(async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: SCALE });
  await page.goto(FILE_URL, { waitUntil: 'networkidle0' });

  // Wait for fonts
  await page.evaluateHandle('document.fonts.ready');

  const count = await page.$$eval('.slide', els => els.length);
  console.log(`Found ${count} slides. Exporting at ${WIDTH}x${HEIGHT} @${SCALE}x...`);

  for (let i = 0; i < count; i++) {
    // Force each slide to exact store dimensions for the screenshot
    await page.evaluate((idx, w, h) => {
      const slides = document.querySelectorAll('.slide');
      slides.forEach(s => { s.style.width = ''; s.style.height = ''; });
      const s = slides[idx];
      s.style.width = w + 'px';
      s.style.height = h + 'px';
      s.style.aspectRatio = 'auto';
      s.style.borderRadius = '0';
      s.scrollIntoView();
    }, i, WIDTH, HEIGHT);

    const slide = (await page.$$('.slide'))[i];
    const out = path.join(OUT_DIR, `slide-${i + 1}.png`);
    await slide.screenshot({ path: out, omitBackground: false });
    console.log(`  ✓ ${out}`);
  }

  // === FEATURE GRAPHIC (1024 x 500) ===
  await page.evaluate(() => {
    const f = document.getElementById('feature');
    if (f) {
      f.style.width = '1024px';
      f.style.height = '500px';
      f.style.aspectRatio = 'auto';
      f.style.borderRadius = '0';
      f.scrollIntoView();
    }
  });
  const feature = await page.$('#feature');
  if (feature) {
    const fout = path.join(OUT_DIR, 'feature-graphic.png');
    await feature.screenshot({ path: fout });
    console.log(`  ✓ ${fout}`);
  }

  await browser.close();
  console.log('\nDone. Files in:', OUT_DIR);
})();
