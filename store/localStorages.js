// ローカルストレージ用store
const state = () => ({
  userName: "",
  twitterId: "",
  modeType: 0,
  modeValue: "",
  playType: 0,
  guestPlayFlag: false,
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
  setTwitterId(state, twitterId) {
    state.twitterId = twitterId;
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
    state.battleResult = "";
  },
  setUserName(state, newName) {
    state.userName = newName;
  },
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
  setBattleResult(context, battleResult) {
    context.commit('setBattleResult', battleResult);
  },
  initializationLocalStorage(context) {
    // ローカルストレージの内容を初期化
    context.commit('initializationLocalStorage');
  },
  setTwitterId(context, twitterId) {
    context.commit('setTwitterId', twitterId);
  },
  setUserName(context, newName) {
    context.commit('setUserName', newName);
  },
};

// 上記のオブジェクトをexport
export default {
  state,
  getters,
  mutations,
  actions,
};
