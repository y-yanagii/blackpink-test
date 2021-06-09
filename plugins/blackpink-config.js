// 定数管理ファイル
import Vue from 'vue';

Vue.prototype.$testInfo = {
  // テスト数
  testLength: 300,
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