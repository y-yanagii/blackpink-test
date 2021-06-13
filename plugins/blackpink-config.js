// 定数管理ファイル
import Vue from 'vue';

Vue.prototype.$testInfo = {
  // テスト数
  testLength: 300,
  serialNumbersArray: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121],
  // easyのserialNumber範囲
  easy: [0, 100],
  // normalのserialNumber範囲
  normal: [101, 200],
  // hardのserialNumber範囲
  hard: [201, 300],
  // masterのserialNumber範囲
  master: [301, 400],
  // musicのserialNumber範囲
  music: [401, 500],
}

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
  // 1on1モード
  oneonone: 8,
}

Vue.prototype.$modeNumber = {
  // モード選択画面
  mode: 0,
  // testモード画面(playTypeにも使用)
  test: 1,
  // challengeモード画面(playTypeにも使用)
  challenge: 2, 
  // battleモード画面（playTypeにも使用）
  battle: 3,
  // gameモード画面(playTypeにも使用)
  game: 4,
}

Vue.prototype.$playModeText = {
  // テスト画面タイトル
  test: "TEST",
  // ゲーム画面タイトル
  game: "GAME",
  // チャレンジ画面タイトル
  challenge: "CHALLENGE",
  // バトル画面タイトル
  battle: "BATTLE",
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

Vue.prototype.$signMessages = {
  // ログインしました。
  login: "ログインしました！",
  // ログアウトしました。
  logout: "ログアウトしました！",
  // ログアウトしてください
  promptToLogout: "マイプロフィールからログアウトしてください",
  // ログインしてください
  pleaseLogin: "ログインしてください",
}

Vue.prototype.$privacyText = {
  // public
  public: "PUBLIC",
  // private
  private: "PRIVATE",
}

Vue.prototype.$waitingStatus = {
  // 待ち
  wait: 0,
  // マッチ
  matched: 1,
}

Vue.prototype.$battleDisplayNum = {
  // バトル開始
  battle: 0,
  // START!
  start: 1,
  // question No.◯◯
  questionNo: 2,
  // テストカード
  test: 3,
}

// 1対1の正誤判定
Vue.prototype.$answerJudgment = {
  // 正解
  correct: "correct",
  // 不正解
  incorrect: "incorrect",
  // ◯
  correctMark: 2,
  // ×
  incorrectMark: 1,
  // win
  win: "win",
  // draw
  draw: "draw",
  // lose
  lose: "lose",
}

// COM情報
Vue.prototype.$com = {
  // COMのTwitterId
  comId: "account",
}

// GUEST
Vue.prototype.$guest = {
  // guestのTwitterId
  twitterId: "home",
  // guestのユーザ名
  userName: "GUEST",
}