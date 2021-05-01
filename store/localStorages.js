const state = () => ({
  userName: "",
  modeType: 0,
  modeValue: ""
});

const getters = {
  // ローカルストレージ保存のモード種別とモード値をオブジェクトで返す
  choiceMode: state => {
    return {
      modeType: state.modeType, modeValue: state.modeValue
    }
  }
};

const mutations = {
  // mutationsがstateのデータを実際に変更
  selectMode(state, choiceMode) {
    state.modeType = choiceMode.modeType;
    state.modeValue = choiceMode.modeValue;
  }
};

const actions = {
  selectMode(context, choiceMode) {
    context.commit('selectMode', choiceMode);
  }
};

// 上記のオブジェクトをexport
export default {
  state,
  getters,
  mutations,
  actions,
};
