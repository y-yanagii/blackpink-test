// PuppeteerによるWebスクレイピング
const puppeteer = require('puppeteer');

// ブラウザ起動
puppeteer.launch({
  headless: false, // ヘッドレスをオフ（ブラウザが見えるように）
  slowMo: 300      // 何が起こっているかを分かりやすくするため遅延
}).then(async browser => {
  const page = await browser.newPage() // ブラウザの新しいタブを表示
  await page.goto('https://music.apple.com/jp/search/song?term=blackpink'); // iTunesのURLにアクセス（曲検索でブラックピンクを指定して検索した画面にアクセス）
  await page.waitForSelector('.context-menu__overflow'); // 指定した要素が表示されるまで待つ
  const menus = await page.$$(".songs-list .songs-list-row"); // 1曲の行リストdiv

  // 1曲の行ずつループ
  for (const menu of menus) {
    const menuDiv = await menu.$('div.dt-media-contextual-menu.songs-list-row__context-menu'); // 「•••」のdiv
    if (menuDiv !== null) {
      await menu.click();
      await menuDiv.click(); // 共有liを表示
      // await page.waitForSelector('.context-menu__option.context-menu__option--parent'); // 共有liが表示されるまで待つ
      const menuShare = await page.$('.context-menu__option.context-menu__option--parent'); // 共有li
      await menuShare.hover(); // 共有liにフォーカス
      await menuShare.click(); // 共有liをクリック
      // const subMenu = await menuShare.$('.context-menu.context-menu--submenu'); // シェアDiv領域(Twitter ~ リンクをコピー)
      const embed = await page.$('ul .context-menu__option:nth-child(3)'); // 埋め込みコードli
      await embed.click(); // 埋め込みコードをクリック

      await browser.defaultBrowserContext().overridePermissions('https://music.apple.com/jp/search/song?term=blackpink', ['clipboard-read', 'clipboard-write']);
      await page.bringToFront();
      const paste = await page.evaluate(() => {
        // Copy the selected content to the clipboard
        // document.execCommand('copy');
        // Obtain the content of the clipboard as a string
        return navigator.clipboard.readText();
      });

      console.log(paste);
      
    }
  }




  // await Promise.all(menus.map(async menu => await setEmbedCode(menu))); // •••divリストを1件ずつ処理
  
  // console.log(typeof(menus[0].$('.dt-media-contextual-menu.songs-list-row__context-menu')));
  // console.log(await menus[0].$('.dt-media-contextual-menu.songs-list-row__context-menu'));
  // 共有liのクラス名.context-menu__option
  // 埋め込みコードをコピーspanのクラス名context-menu__option-text-clamp

  
  // await page.screenshot({ path: './scraping/sample1.png' })
  await browser.close() // ブラウザを閉じる
});

// async function setEmbedCode(menu) {
  // const songMenu = await menu.$('.dt-media-contextual-menu.songs-list-row__context-menu');
  
  // await songMenu.click();

  // await (await menu.$('.songs-list-row__context-menu')).click();
  // await (await menus[0].$('.songs-list-row__context-menu')).click();
  // const songMenu = await menu.$(".songs-list-row__context-menu"); // •••div
  // await songMenu.click(); // •••div
  // await page.screenshot({ path: './scraping/sample1.png' });
// }