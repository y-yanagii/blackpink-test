// PuppeteerによるWebスクレイピング
const puppeteer = require('puppeteer');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let tests = []; // テストコレクションオブジェクト
// テストドキュメント
let test = {
  embedInfo: {
    detail: {
      subCode: "",
      subContent: "",
    },
    embedCode: "",
    embedType: 1,
  },
  modeType: 5,
  options: [
    {
      answer: {
        isAnswer: false,
        isNumber: 0,
      },
      optionContent: "",
    },
    {
      answer: {
        isAnswer: false,
        isNumber: 0,
      },
      optionContent: "",
    },
    {
      answer: {
        isAnswer: false,
        isNumber: 0,
      },
      optionContent: "",
    },
    {
      answer: {
        isAnswer: false,
        isNumber: 0,
      },
      optionContent: "",
    },
  ],
  question: "この曲のタイトルは？",
  questionType: 5,
}

let ituensSiteDatas = []; // iTuensサイトデータ
let songs = []; // 曲名のみの配列も保持

// iTuensAPIより楽曲情報の取得
let request = new XMLHttpRequest(); // HTTP通信用のオブジェクト
request.open('GET', "https://itunes.apple.com/search/?term=BLACKPINK&entity=musicTrack", false); // リクエスト設定
request.send(); // リクエスト投げる
let iTuensApiDatas = JSON.parse(request.responseText); // 返ってきたレスポンスがstringのためJSON.parse

// ここからスクレイピング処理（ブラウザ起動）
puppeteer.launch({
  headless: false, // ヘッドレスをオフ（ブラウザが見えるように）
  slowMo: 300      // 何が起こっているかを分かりやすくするため動作遅延
}).then(async browser => {
  let res = asyncData();
  console.log(res);
  const page = await browser.newPage() // ブラウザの新しいタブを表示
  await page.goto('https://music.apple.com/jp/search/song?term=blackpink'); // iTunesのURLにアクセス（曲検索でブラックピンクを指定して検索した画面にアクセス）
  await page.waitForSelector('.context-menu__overflow'); // 指定した要素が表示されるまで待つ
  const menus = await page.$$(".songs-list .songs-list-row"); // 曲の行リストdiv

  await page.evaluate(() => { document.getElementsByClassName('songs-list-row')[24].scrollIntoView(true); }); // 曲リストを最下部までスクロールさせ曲リストを取得してくる
  await page.waitForSelector('div .songs-list-row:nth-child(30)') // 曲リストが増えるのを待つ
  await page.evaluate(() => { document.getElementsByClassName('songs-list-row')[74].scrollIntoView(true); }); // 再度曲リストを追加し50曲以上にする（iTuensAPIで取得した試聴データが50件のため）
  await page.waitForSelector('div .songs-list-row:nth-child(80)') // 曲リストが増えるのを待つ

  // 曲の行をループ
  for (const menu of menus) {
    let siteData = { songName: "", embed: "" }; // 曲の行データ（曲名、embedコード）
    const menuDiv = await menu.$('div.dt-media-contextual-menu.songs-list-row__context-menu'); // 「•••」のdiv部分
    if (menuDiv !== null) {
      await menu.click(); // 曲の行をクリック（フォーカスさせたいため）
      await menuDiv.click(); // 「•••」をクリックし共有liを表示
      const menuShare = await page.$('.context-menu__option.context-menu__option--parent'); // 共有liをクリックした時のサブメニュー
      await menuShare.hover(); // 共有liにフォーカス
      await menuShare.click(); // 共有liをクリック
      const embed = await page.$('ul .context-menu__option:nth-child(3)'); // 埋め込みコードli
      await embed.click(); // 埋め込みコードをクリック

      await browser.defaultBrowserContext().overridePermissions('https://music.apple.com/jp/search/song?term=blackpink', ['clipboard-read', 'clipboard-write']); // クリップボードAPIへのアクセス許可を設定
      await page.bringToFront(); // ページを前に出す（タブを有効化）
      // embedコード文字列
      siteData.embed = await page.evaluate(() => {
        return navigator.clipboard.readText(); // 既にクリップボードにコピー済みのため、クリップボードを参照し文字列を返す
      });
      // 曲名
      siteData.songName =　await (await (await menu.$('.songs-list-row__song-name')).getProperty('textContent')).jsonValue(); // jsonValueをstringの形で取得するためにjsonValueにもawaitを使用(未使用の場合Promiseが返る)
      const replaceSongName = siteData.songName.replace(/\([^\)]*\)/g, ""); // ()内ごと削除する正規表現
      songs.push(siteData.songName);
      ituensSiteDatas.push(siteData);
    }
  }

  await browser.close() // ブラウザを閉じる

  // 試聴データ分ループ
  for (const iTuensApiData of iTuensApiDatas) {
    const matchData = ituensSiteDatas.find(itunesSite => itunesSite.songName === iTuensApiData.trackName); // 全く同じ曲名を取得

    // 取得できた場合
    if (typeof matchData !== "undefined") {
      // Firestoreに格納するテストドキュメントの生成
      
    }
  }

});
