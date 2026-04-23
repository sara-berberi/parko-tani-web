// Exports slides 1–5 as App Store PNGs for iPhone and iPad 13"
// Run: node export-screenshots.js
// Requires: npm install puppeteer

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const SIZES = [
  { name: 'iphone',  w: 1290,  h: 2796,  dir: 'screenshots/iphone' },
  { name: 'ipad-13', w: 2064,  h: 2752,  dir: 'screenshots/ipad-13' },
];

const fileUrl = `file://${path.join(__dirname, 'launches.html').replace(/\\/g, '/')}?export`;

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });

  for (const size of SIZES) {
    const outDir = path.join(__dirname, size.dir);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const page = await browser.newPage();

    // Pass target dimensions to the export script via URL params
    const url = `${fileUrl}&w=${size.w}&h=${size.h}`;

    // Viewport wide enough for natural slide render (360px slide needs 1600px+ body)
    await page.setViewport({ width: 1600, height: size.h + 200, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.waitForSelector('#export-1');

    await page.evaluate(() =>
      Promise.all(Array.from(document.images).map(img =>
        img.complete ? Promise.resolve()
          : new Promise(r => { img.onload = r; img.onerror = r; })
      ))
    );

    for (let i = 1; i <= 5; i++) {
      const el = await page.$(`#export-${i}`);
      const outPath = path.join(outDir, `slide-${i}.png`);
      await el.screenshot({ path: outPath, type: 'png', omitBackground: true });
      console.log(`✓ [${size.name}] slide-${i}.png  →  ${size.w}×${size.h}px`);
    }

    await page.close();
  }

  await browser.close();
  console.log('\nDone.');
})();
