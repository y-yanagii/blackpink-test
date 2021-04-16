import { db } from "~/plugins/firebase";
import { firestoreAction } from 'vuexfire';

const testsRef = db.collection('tests');

const state = () => ({
  // グローバルなデータをここで定義
  tests: [],
  answerInfo: {
    answerResults: [],
    clearTime: "",
    message: "",
    rank: "",
  },
});

const getters = {
  // コンポーネントから参照時gettersから参照する
  getTestsByMode: state => { return state.tests },
  getAnswerInfo: state => { return state.answerInfo },
};

const actions = {
  // ここからmutaionsを呼んだり、バックエンドのAPIと連携したり
  // testsコレクションの初期化(関連付けしたいコレクション名, コレクションへの参照の名前を渡す)
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('tests', testsRef)
  }),

  // 解答結果オブジェクトをセット
  setAnswerInfo(context, answerInfo) {
    context.commit('setAnswerInfo', answerInfo);
  }
};

const mutations = {
  // mutationsがstate（グローバル変数的な）のデータを実際に変更
  // 解答結果オブジェクトをセット
  setAnswerInfo(state, answerInfo) {
    state.answerInfo.answerResults = answerInfo.answers;
    state.answerInfo.clearTime = answerInfo.clearTime;
  }
};

// 上のオブジェクトをexport
export default {
  state,
  getters,
  mutations,
  actions,
};
