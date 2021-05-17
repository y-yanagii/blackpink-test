// ローカルストレージ用store
const state = () => ({
  userName: "",
  modeType: 0,
  modeValue: "",
  playType: 0,
  guestPlayFlag: false,
  newRecord: {},
  targetTests: [],
});

const getters = {
  // ローカルストレージ保存のモード種別とモード値をオブジェクトで返す
  choiceMode: state => {
    return { modeType: state.modeType, modeValue: state.modeValue }
  },
  getUserName: state => { return state.userName },
  getPlayType: state => { return state.playType },
  getGuestPlay: state => { return state.guestPlayFlag },
  getNewRecord: state => { return state.newRecord },
  getTargetTests: state => { return state.targetTests },
};

const mutations = {
  // mutationsがstateのデータを実際に変更
  selectMode(state, choiceMode) {
    state.modeType = choiceMode.modeType;
    state.modeValue = choiceMode.modeValue;
    state.playType = choiceMode.playType;
  },
  setUserName(state, newUserName) {
    state.userName = newUserName;
  },
  setPlayType(state, showNumber) {
    state.playType = showNumber;
  },
  setGuestPlay(state, guestPlayFlag) {
    state.guestPlayFlag = guestPlayFlag;
  },
  // 解答結果オブジェクトをセット
  setNewRecord(state, newRecord) {
    state.newRecord = newRecord;
  },
  setTargetTests(state, targetTests) {
    state.targetTests = targetTests;
  }
};

const actions = {
  selectMode(context, choiceMode) {
    context.commit('selectMode', choiceMode);
  },
  setUserName(context, newUserName) {
    context.commit('setUserName', newUserName);
  },
  setPlayType(context, showNumber) {
    context.commit('setPlayType', showNumber);
  },
  setGuestPlay(context, guestPlayFlag) {
    context.commit('setGuestPlay', guestPlayFlag);
  },
  // 解答結果オブジェクトをセット
  setNewRecord(context, newRecord) {
    context.commit('setNewRecord', newRecord);
  },
  setTargetTests(context, targetTests) {
    context.commit('setTargetTests', targetTests);
  }
};

// 上記のオブジェクトをexport
export default {
  state,
  getters,
  mutations,
  actions,
};
