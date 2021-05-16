// PuppeteerによるWebスクレイピング
const puppeteer = require('puppeteer');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require('fs');
const firebaseAdmin = require('firebase-admin');

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
request.open('GET', "https://itunes.apple.com/search/?term=BLACKPINK&entity=musicTrack&limit=100", false); // リクエスト設定
request.send(); // リクエスト投げる
let iTuensApiDatas = JSON.parse(request.responseText); // 返ってきたレスポンスがstringのためJSON.parse
console.log(iTuensApiDatas.results.length)

// ここからスクレイピング処理（ブラウザ起動）
// puppeteer.launch({
//   headless: false, // ヘッドレスをオフ（ブラウザが見えるように）
//   slowMo: 100      // 何が起こっているかを分かりやすくするため動作遅延
// }).then(async browser => {
//   const page = await browser.newPage() // ブラウザの新しいタブを表示
//   await page.goto('https://music.apple.com/jp/search/song?term=blackpink'); // iTunesのURLにアクセス（曲検索でブラックピンクを指定して検索した画面にアクセス）
//   await page.waitForSelector('.context-menu__overflow'); // 指定した要素が表示されるまで待つ
//   await page.waitForSelector('.songs-list-row'); // 指定した要素が表示されるまで待つ
//   await page.evaluate(() => { document.getElementsByClassName('songs-list-row')[24].scrollIntoView(true); }); // 曲リストを最下部までスクロールさせ曲リストを取得してくる
//   await page.waitForSelector('div .songs-list-row:nth-child(30)') // 曲リストが増えるのを待つ
//   await page.evaluate(() => { document.getElementsByClassName('songs-list-row')[74].scrollIntoView(true); }); // 再度曲リストを追加し50曲以上にする（iTuensAPIで取得した試聴データが50件のため）
//   await page.waitForSelector('div .songs-list-row:nth-child(80)') // 曲リストが増えるのを待つ
//   const menus = await page.$$(".songs-list .songs-list-row"); // 曲の行リストdiv
// console.log(menus.length);
//   // 曲の行をループ
//   for (const menu of menus) {
//     let siteData = { songName: "", embed: "" }; // 曲の行データ（曲名、embedコード）
//     if (menu !== null) {
//       await menu.click(); // 曲の行をクリック（フォーカスさせたいため）
//       const menuDiv = await menu.$('.songs-list-row__context-menu'); // 「•••」のdiv部分
//       await menuDiv.click(); // 「•••」をクリックし共有liを表示
//       const menuShare = await page.$('.context-menu__option.context-menu__option--parent'); // 共有liをクリックした時のサブメニュー
//       await menuShare.hover(); // 共有liにフォーカス
//       await menuShare.click(); // 共有liをクリック
//       const embed = await page.$('ul .context-menu__option:nth-child(3)'); // 埋め込みコードli
//       await embed.click(); // 埋め込みコードをクリック

//       await browser.defaultBrowserContext().overridePermissions('https://music.apple.com/jp/search/song?term=blackpink', ['clipboard-read', 'clipboard-write']); // クリップボードAPIへのアクセス許可を設定
//       await page.bringToFront(); // ページを前に出す（タブを有効化）
//       // embedコード文字列
//       siteData.embed = await page.evaluate(() => {
//         return navigator.clipboard.readText(); // 既にクリップボードにコピー済みのため、クリップボードを参照し文字列を返す
//       });
//       // 曲名
//       siteData.songName =　await (await (await menu.$('.songs-list-row__song-name')).getProperty('textContent')).jsonValue(); // jsonValueをstringの形で取得するためにjsonValueにもawaitを使用(未使用の場合Promiseが返る)
//       const replaceSongName = siteData.songName.replace(/\([^\)]*\)/g, "").replace(/\[[^\)]*\]/g, ""); // ()内と[]内ごと削除する正規表現
//       if (!songs.includes(replaceSongName)) songs.push(replaceSongName); // 曲名の重複をチェックしつつ追加
//       ituensSiteDatas.push(siteData);
//     }
//   }
//   console.log(songs);

//   await browser.close() // ブラウザを閉じる

//   // 選択値の要素番号用のランダム値を定義
//   let arrayNums = [0, 1, 2, 3];

//   // 試聴データ分ループ
//   for (const iTuensApiData of iTuensApiDatas.results) {
//     const matchData = ituensSiteDatas.find(itunesSite => itunesSite.songName === iTuensApiData.trackName); // 全く同じ曲名を取得

//     // 取得できた場合
//     if (typeof matchData !== "undefined") {
//       // Firestoreに格納するテストドキュメントの生成
//       let answerSongName = matchData.songName.replace(/\([^\)]*\)/g, "").replace(/\[[^\)]*\]/g, ""); // ()と[]内を括弧ごと削除。もっといい正規表現あるはず？
//       // 選択値の要素数をランダムで定義
//       arrayNums = arrayShuffle(arrayNums);
//       // 正答の曲名以外の曲名リストを作成し、シャッフル後の先頭から3つを取得（正答以外の選択値）
//       let refinedSongNames = arrayShuffle(songs.filter(s => s !== answerSongName));
//       refinedSongNames = refinedSongNames.slice(0, 3); // 正答以外の選択値
//       refinedSongNames.push(answerSongName); // 正答の曲名も追加
//       refinedSongNames = arrayShuffle(refinedSongNames); // 選択値の曲名配列をシャッフル

//       // 選択値をセット
//       for (let i=0; i<arrayNums.length; i++) {
//         if (answerSongName === refinedSongNames[arrayNums[i]]) {
//           // 正解の場合フラグを立てる
//           test.options[arrayNums[i]].answer.isAnswer = true
//           test.options[arrayNums[i]].answer.isNumber = 1
//         }
//         // 曲名を設定
//         test.options[arrayNums[i]].optionContent = refinedSongNames[arrayNums[i]];
//       }

//       // 試聴データ、iframeを設定
//       test.embedInfo.embedCode = iTuensApiData.previewUrl;
//       test.embedInfo.detail.subCode = matchData.embed;
//       console.log(test);
//       tests.push(test);
//     }
//   }
//   console.log(tests.length);

//   // jsonファイル出力（fsはコールバック関数出なくてはならないためcreateFile）
//   const source = { tests: tests };
//   const createFile = (pathName, source) => {
//     const toJSON = JSON.stringify(source);
//     fs.writeFile(pathName, toJSON, (err) => {
//       if (err) rej(err);
//     });
//   };

//   createFile('scraping/newTests.json', source); // JSONファイル生成
  // let rawData = fs.readFileSync('scraping/newTests.json'); // 読み込み用Jsonファイルデータ
  // let registerTests = JSON.parse(rawData); // JSONファイルをJSONデータへ変換
  // // Firebase設定
  // firebaseAdmin.initializeApp({
  //   apiKey: "AIzaSyDchpCeBzZM6r1sgqxaLPcj3MZV9gEjqcM",
  //   authDomain: "blackpink-test.firebaseapp.com",
  //   projectId: "blackpink-test"
  // });

  // const db = firebaseAdmin.firestore();

  // registerTests.tests.forEach(function(obj) {
  //   db.collection("tests").doc().set({
  //     embedInfo: {
  //       detail: {
  //         subCode: obj.embedInfo.detail.subCode,
  //         subContent: obj.embedInfo.detail.subContent,
  //       },
  //       embedCode: obj.embedInfo.embedCode,
  //       embedType: obj.embedInfo.embedType,
  //     },
  //     modeType: obj.modeType,
  //     options: [
  //       {
  //         answer: {
  //           isAnswer: obj.options[0].answer.isAnswer,
  //           isNumber: obj.options[0].answer.isNumber,
  //         },
  //         optionContent: obj.options[0].optionContent,
  //       },
  //       {
  //         answer: {
  //           isAnswer: obj.options[1].answer.isAnswer,
  //           isNumber: obj.options[1].answer.isNumber,
  //         },
  //         optionContent: obj.options[1].optionContent,
  //       },
  //       {
  //         answer: {
  //           isAnswer: obj.options[2].answer.isAnswer,
  //           isNumber: obj.options[2].answer.isNumber,
  //         },
  //         optionContent: obj.options[2].optionContent,
  //       },
  //       {
  //         answer: {
  //           isAnswer: obj.options[3].answer.isAnswer,
  //           isNumber: obj.options[3].answer.isNumber,
  //         },
  //         optionContent: obj.options[3].optionContent,
  //       },
  //     ],
  //     question: obj.question,
  //     questionType: obj.questionType,
  //   }).then(function(docRef) {
  //     console.log("ID: ", docRef.id);
  //   });
  // });

// });

let rawData = fs.readFileSync('scraping/newTests.json'); // 読み込み用Jsonファイルデータ
  let registerTests = JSON.parse(rawData); // JSONファイルをJSONデータへ変換
  // Firebase設定
  firebaseAdmin.initializeApp({
    apiKey: "AIzaSyDchpCeBzZM6r1sgqxaLPcj3MZV9gEjqcM",
    authDomain: "blackpink-test.firebaseapp.com",
    projectId: "blackpink-test"
  });

  const db = firebaseAdmin.firestore();

  registerTests.tests.forEach(function(obj) {
    db.collection("tests").doc().set({
      embedInfo: {
        detail: {
          subCode: obj.embedInfo.detail.subCode,
          subContent: obj.embedInfo.detail.subContent,
        },
        embedCode: obj.embedInfo.embedCode,
        embedType: obj.embedInfo.embedType,
      },
      modeType: obj.modeType,
      options: [
        {
          answer: {
            isAnswer: obj.options[0].answer.isAnswer,
            isNumber: obj.options[0].answer.isNumber,
          },
          optionContent: obj.options[0].optionContent,
        },
        {
          answer: {
            isAnswer: obj.options[1].answer.isAnswer,
            isNumber: obj.options[1].answer.isNumber,
          },
          optionContent: obj.options[1].optionContent,
        },
        {
          answer: {
            isAnswer: obj.options[2].answer.isAnswer,
            isNumber: obj.options[2].answer.isNumber,
          },
          optionContent: obj.options[2].optionContent,
        },
        {
          answer: {
            isAnswer: obj.options[3].answer.isAnswer,
            isNumber: obj.options[3].answer.isNumber,
          },
          optionContent: obj.options[3].optionContent,
        },
      ],
      question: obj.question,
      questionType: obj.questionType,
    }).then(function(docRef) {
      console.log("ID: ", docRef.id);
    });
  });

// 配列の中身をシャッフルして返す
function arrayShuffle(array) {
  for (let i = (array.length - 1); 0 < i; i--) {
    // ランダムで要素数1つを取得
    let r = Math.floor(Math.random() * (i + 1));

    // 並び替え
    let tmp = array[i];
    array[i] = array[r];
    array[r] = tmp
  }

  return array
}