// ローカルストレージ用store
const state = () => ({
  userName: "",
  modeType: 0,
  modeValue: ""
});

const getters = {
  // ローカルストレージ保存のモード種別とモード値をオブジェクトで返す
  choiceMode: state => {
    return { modeType: state.modeType, modeValue: state.modeValue }
  },
  getUserName: state => {
    return state.userName }
};

const mutations = {
  // mutationsがstateのデータを実際に変更
  selectMode(state, choiceMode) {
    state.modeType = choiceMode.modeType;
    state.modeValue = choiceMode.modeValue;
  },
  setUserName(state, newUserName) {
    state.userName = newUserName;
  }
};

const actions = {
  selectMode(context, choiceMode) {
    context.commit('selectMode', choiceMode);
  },
  setUserName(context, newUserName) {
    context.commit('setUserName', newUserName);
  }
};

// 上記のオブジェクトをexport
export default {
  state,
  getters,
  mutations,
  actions,
};
