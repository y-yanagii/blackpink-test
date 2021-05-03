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
}

Vue.prototype.$path = {
  modes: ["easy", "normal", "hard", "master", "suddendeath", "music"]
}