const state = () => ({
  // グローバルなデータをここで定義
  modes: [
    { playType: 1, modeType: 0, modeText: "E A S Y" },
    { playType: 1, modeType: 1, modeText: "N O R M A L" },
    { playType: 1, modeType: 2, modeText: "H A R D" },
    { playType: 2, modeType: 3, modeText: "M A S T E R" },
    { playType: 2, modeType: 4, modeText: "SUDDEN DEATH" },
    { playType: 1, modeType: 5, modeText: "M U S I C" },
    { playType: 3, modeType: 6, modeText: "B U B B L E" },
    { playType: 3, modeType: 7, modeText: "P U Z Z L E" },
  ],
  modeType: 0,
  modeValue: ""
});

const getters = {
  // コンポーネントから参照時gettersから参照する
  getModes: state => { return state.modes },
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
