import { db } from "~/plugins/firebase";
import { firestoreAction } from 'vuexfire';

const modesRef = db.collection('modes');

const state = () => ({
  // グローバルなデータをここで定義
  modes: [],
  modeType: 0,
  modeValue: ""
});

const getters = {
  // コンポーネントから参照時gettersから参照する
  choiceMode: state => {
    // ローカルストレージ保存のモード種別とモード値をオブジェクトで返す
    return {
      modeType: state.modeType, modeValue: state.modeValue
    }
  },
  orderdModes: state => {
    return _.orderBy(state.modes, ['modeType'], ['asc'])
  }
}

const mutations = {
  // mutationsがstate（グローバル変数的な）のデータを実際に変更
  selectMode(state, choiceMode) {
    state.modeType = choiceMode.modeType;
    state.modeValue = choiceMode.modeValue;
  }
};

const actions = {
  // ここからmutaionsを呼んだり、バックエンドのAPIと連携したり
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('modes', modesRef)
  }),
  selectMode(context, choiceMode) {
    context.commit('selectMode', choiceMode);
  }
};

// 上のオブジェクトをexport
export default {
  state,
  getters,
  mutations,
  actions,
};
