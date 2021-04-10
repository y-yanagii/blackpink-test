const state = () => ({
  // グローバルなデータをここで定義
  mode: ""
});

const getters = {
  // コンポーネントから参照時gettersから参照する
  choiceMode: state => { return state.mode }
}

const mutations = {
  // mutationsがstate（グローバル変数的な）のデータを実際に変更
  selectMode(state, choiceMode) {
    state.mode = choiceMode;
  }
};

const actions = {
  // ここからmutaionsを呼んだり、バックエンドのAPIと連携したり
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
