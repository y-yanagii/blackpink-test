// ローカルストレージ用store
const state = () => ({
  userName: "",
  twitterId: "",
  modeType: 0,
  modeValue: "",
  playType: 0,
  guestPlayFlag: false,
  newRecord: {},
  targetTests: [],
  battleResult: "",
});

const getters = {
  // ローカルストレージ保存のモード種別とモード値をオブジェクトで返す
  choiceMode: state => {
    return { modeType: state.modeType, modeValue: state.modeValue }
  },
  getUserName: state => { return state.userName },
  getTwitterId: state => { return state.twitterId },
  getPlayType: state => { return state.playType },
  getGuestPlay: state => { return state.guestPlayFlag },
  getNewRecord: state => { return state.newRecord },
  getTargetTests: state => { return state.targetTests },
  getBattleResult: state => { return state.battleResult },
};

const mutations = {
  // mutationsがstateのデータを実際に変更
  selectMode(state, choiceMode) {
    state.modeType = choiceMode.modeType;
    state.modeValue = choiceMode.modeValue;
    state.playType = choiceMode.playType;
  },
  setUserNameTwitterId(state, payload) {
    state.userName = payload.name;
    state.twitterId = payload.twitterId;
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
  },
  setBattleResult(state, battleResult) {
    state.battleResult = battleResult;
  },
  initializationLocalStorage(state) {
    state.userName = "";
    state.twitterId = "";
    state.modeType = 0;
    state.modeValue = "";
    state.playType = 0;
    state.guestPlayFlag = false;
    state.newRecord = {};
    state.targetTests = [];
    state.battleResult = "";
  }
};

const actions = {
  selectMode(context, choiceMode) {
    context.commit('selectMode', choiceMode);
  },
  setUserNameTwitterId(context, payload) {
    context.commit('setUserNameTwitterId', payload);
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
  },
  setBattleResult(context, battleResult) {
    context.commit('setBattleResult', battleResult);
  },
  initializationLocalStorage(context) {
    // ローカルストレージの内容を初期化
    context.commit('initializationLocalStorage');
  }
};

// 上記のオブジェクトをexport
export default {
  state,
  getters,
  mutations,
  actions,
};
