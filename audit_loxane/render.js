const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path='file://'+process.cwd()+'/audit_loxane/report.html';
(async()=>{
  const b=await chromium.launch();
  const ctx=await b.newContext({deviceScaleFactor:2});
  const p=await ctx.newPage();
  await p.goto(path,{waitUntil:'networkidle'});
  // PDF
  await p.pdf({path:'audit_loxane/Audit-Web-Garage-Loxane.pdf',width:'794px',height:'1123px',printBackground:true,pageRanges:'1-2'});
  // PNG per page (crisp, x2)
  const pages=await p.$$('.page');
  for(let i=0;i<pages.length;i++){
    await pages[i].screenshot({path:`audit_loxane/Audit-Loxane-page${i+1}.png`});
  }
  await b.close();
  console.log('done, pages:',pages.length);
})();
