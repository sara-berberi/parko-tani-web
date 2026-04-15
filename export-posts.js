// Run: node export-posts.js
// Requires: npm install puppeteer
// Output: exported-posts/ folder
// All posts: 1080×1350 (Instagram portrait 4:5)

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const OUT = path.join(__dirname, "exported-posts");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

const W = 1080;
const H = 1350; // 4:5 portrait

const toFileUrl = (f) =>
  "file:///" + path.join(__dirname, f).replace(/\\/g, "/");

const JOBS = [
  { file: "instagram-posts.html",        sel: ".post-1",   name: "01-coming-soon" },
  { file: "instagram-posts.html",        sel: ".post-2",   name: "02-how-it-works" },
  { file: "instagram-posts.html",        sel: ".post-3",   name: "03-stats" },
  { file: "instagram-posts.html",        sel: ".post-4",   name: "04-brand-reveal" },
  { file: "instagram-posts.html",        sel: ".post-5",   name: "05-features" },
  { file: "instagram-new-posts.html",    sel: ".pa",       name: "06-coming-soon-big" },
  { file: "instagram-new-posts.html",    sel: ".pb",       name: "07-driver" },
  { file: "instagram-new-posts.html",    sel: ".pc",       name: "08-owner" },
  { file: "instagram-new-posts.html",    sel: ".pd",       name: "09-both-phones" },
  { file: "instagram-posts-mobile.html", sel: ".post.p1",  name: "10-coming-soon-mobile" },
  { file: "instagram-posts-mobile.html", sel: ".post.p2",  name: "11-how-it-works-mobile" },
  { file: "instagram-posts-mobile.html", sel: ".post.p3",  name: "12-stats-mobile" },
  { file: "instagram-posts-mobile.html", sel: ".post.p4",  name: "13-brand-reveal-mobile" },
  { file: "instagram-posts-mobile.html", sel: ".post.p5",  name: "14-features-mobile" },
];

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({ headless: "new" });

  const byFile = {};
  for (const job of JOBS) {
    if (!byFile[job.file]) byFile[job.file] = [];
    byFile[job.file].push(job);
  }

  for (const [file, jobs] of Object.entries(byFile)) {
    console.log(`\nLoading ${file}...`);
    const page = await browser.newPage();

    // Set viewport to portrait dimensions
    await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
    await page.goto(toFileUrl(file), { waitUntil: "networkidle0" });
    await page.evaluateHandle("document.fonts.ready");
    await new Promise((r) => setTimeout(r, 1000));

    for (const job of jobs) {
      // Force every post element to exactly 1080×1350
      await page.evaluate(
        ({ sel, w, h }) => {
          const el = document.querySelector(sel);
          if (!el) return;
          el.style.cssText += `
            width: ${w}px !important;
            height: ${h}px !important;
            min-width: ${w}px !important;
            min-height: ${h}px !important;
            max-width: ${w}px !important;
            max-height: ${h}px !important;
            overflow: hidden !important;
          `;
        },
        { sel: job.sel, w: W, h: H }
      );

      const el = await page.$(job.sel);
      if (!el) {
        console.log(`  ⚠  Not found: ${job.sel}`);
        continue;
      }

      const outPath = path.join(OUT, job.name + ".png");
      await el.screenshot({ path: outPath, omitBackground: false });
      console.log(`  ✓  ${job.name}.png  (${W}×${H})`);
    }

    await page.close();
  }

  await browser.close();
  console.log(`\n✅  Done! ${JOBS.length} images saved to: ${OUT}`);
})();
