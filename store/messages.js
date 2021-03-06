const state = () => ({
  messages: [
    { rankingMax: 1, rankingMin: 1, message: "ðð¤ðKing of BLINKðð¤ð" },
    { rankingMax: 2, rankingMin: 2, message: "Almost to the King...ðð¤!!!" },
    { rankingMax: 3, rankingMin: 3, message: "You are one of the top threeð!!!" },
    { rankingMax: 4, rankingMin: 4, message: "It's a great fandomð¤!!!" },
    { rankingMax: 10, rankingMin: 5, message: "BLACKPINK in your area!!!" },
    { rankingMax: 11, rankingMin: 11, message: "You're an avid BLINK!" },
    { rankingMax: 12, rankingMin: 12, message: "That's a great score!!!" },
    { rankingMax: 13, rankingMin: 13, message: "Try again." },
    { rankingMax: 14, rankingMin: 14, message: "You are a general fan.ð¬" },
    { rankingMax: 15, rankingMin: 15, message: "I'm not learning enough...âï¸" },
    { rankingMax: 16, rankingMin: 16, message: "You're a fair-weather.ð¢" },
    { rankingMax: 17, rankingMin: 17, message: "Very disappointing results...ð" },
    { rankingMax: 18, rankingMin: 18, message: "Do a search on BLACKPINK." },
    { rankingMax: 20, rankingMin: 19, message: "Have you heard of BLACKPINK???" },
    { rankingMax: 9999999, rankingMin: 21, message: "Oh my God......" },
  ],
  snackbarText: "",
});

const getters = {
  // é ä½ãã¨ã®ã¡ãã»ã¼ã¸ãåå¾
  getMessage: state => rank => {
    return state.messages.find(m => m.rankingMax >= rank && m.rankingMin <= rank).message
  },
  // ã¹ããã¯ãã¼ãã­ã¹ããè¿å´
  getSnackbarText: state => { return state.snackbarText },
  
};

const mutations = {
  setSnackbarText(state, newText) {
    state.snackbarText = newText;
  },
};

const actions = {
  setSnackbarText(context, newText) {
    // ã¹ããã¯ãã¼ã¡ãã»ã¼ã¸ã®è¨­å®
    context.commit('setSnackbarText', newText);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
