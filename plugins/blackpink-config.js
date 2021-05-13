// 定数管理ファイル
import Vue from 'vue';

Vue.prototype.$user = {
  defaultName: "NO NAME",
  defaultRankId: "new",
}

Vue.prototype.$mode = {
  // easyモード
  easy: 0,
  // normalモード
  normal: 1,
  // hardモード
  hard: 2,
  // masterモード
  master: 3,
  // sudden-deathモード
  suddendeath: 4,
  // musicモード
  music: 5,
  // bubbleモード
  bubble: 6,
  // puzzleモード
  puzzle: 7,
}

Vue.prototype.$path = {
  modes: ["easy", "normal", "hard", "master", "suddendeath", "music", "bubble"]
}

Vue.prototype.$modeNumber = {
  // モード選択画面
  mode: 0,
  // testモード画面(playTypeにも使用)
  test: 1,
  // gameモード画面(playTypeにも使用)
  game: 2,
  // challengeモード画面(playTypeにも使用)
  challenge: 3, 
}

Vue.prototype.$playModeText = {
  // テスト画面タイトル
  test: "TEST",
  // ゲーム画面タイトル
  game: "GAME",
  // チャレンジ画面タイトル
  challenge: "CHALLENGE",
}

Vue.prototype.$deleteFlag = {
  // 表示
  display: 0,
  // 削除対象
  delete: 1,
  // 削除済み
  deleted: 2
}

Vue.prototype.$gameMessage = {
  // PERFECT
  perfect: "💖🖤👑 PERFECT 👑🖤💖",

  // CLEAR
  clear: "GAME CLEAR!!!",

  // GAME OVER
  gameOver: "GAME OVER",
}
