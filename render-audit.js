const puppeteer = require('puppeteer');
const path = require('path');
(async () => {
  const b = await puppeteer.launch({headless:'new', args:['--no-sandbox','--disable-setuid-sandbox','--force-color-profile=srgb']});
  const p = await b.newPage();
  await p.setViewport({width:1080, height:1350, deviceScaleFactor:2});
  await p.goto('file://'+path.resolve(__dirname,'maquette-ecluse34/audit.html'), {waitUntil:'networkidle0', timeout:60000});
  await p.evaluateHandle('document.fonts.ready');
  await new Promise(r=>setTimeout(r,500));
  await p.screenshot({path:'maquette-ecluse34/audit-ecluse34.png', fullPage:true});
  await b.close(); console.log('DONE');
})().catch(e=>{console.error(e);process.exit(1);});
