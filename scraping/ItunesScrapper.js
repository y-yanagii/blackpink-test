// PuppeteerによるWebスクレイピング
const puppeteer = require('puppeteer');

puppeteer.launch({
  headless: false, // フルバージョンのChromeを使用
  slowMo: 300      // 何が起こっているかを分かりやすくするため遅延
}).then(async browser => {
  const page = await browser.newPage()

  await page.goto('https://www.google.com/')
  await page.type('input[name=q', 'スカイツリー', { delay: 100 })
  await page.click('input[type="submit"]')
  await page.waitForSelector('h3 a')
  await page.screenshot({ path: './scraping/sample1.png' })

  await browser.close()
});
