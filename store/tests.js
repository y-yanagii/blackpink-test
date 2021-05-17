import { db } from "~/plugins/firebase";
import { firestoreAction } from 'vuexfire';

const testsRef = db.collection('tests');

const state = () => ({
  // グローバルなデータをここで定義
  tests: [],
});

const getters = {
  // コンポーネントから参照時gettersから参照する
  getTestsByMode: state => modeType => {
    // 選択したモード種別でテストを取得する
    return state.tests.filter(t => t.modeType === Number(modeType))
  },
};

const actions = {
  // ここからmutaionsを呼んだり、バックエンドのAPIと連携したり
  // testsコレクションの初期化(関連付けしたいコレクション名, コレクションへの参照の名前を渡す)
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('tests', testsRef)
  }),
};

const mutations = {
  // mutationsがstate（グローバル変数的な）のデータを実際に変更
};

// 上のオブジェクトをexport
export default {
  state,
  getters,
  mutations,
  actions,
};
