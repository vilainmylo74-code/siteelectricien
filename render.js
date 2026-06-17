const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-color-profile=srgb']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1000, deviceScaleFactor: 2 });
  const file = 'file://' + path.resolve(__dirname, 'maquette-ecluse34/index.html');
  await page.goto(file, { waitUntil: 'networkidle0', timeout: 60000 });
  // ensure web fonts are ready
  await page.evaluateHandle('document.fonts.ready');
  await new Promise(r => setTimeout(r, 600));

  // 1) full-page screenshot
  await page.screenshot({ path: 'maquette-ecluse34/maquette-ecluse34-complete.png', fullPage: true });

  // 2) hero-only screenshot (above the fold)
  await page.screenshot({
    path: 'maquette-ecluse34/maquette-ecluse34-hero.png',
    clip: { x: 0, y: 0, width: 1280, height: 660 }
  });

  await browser.close();
  console.log('DONE');
})().catch(e => { console.error(e); process.exit(1); });
