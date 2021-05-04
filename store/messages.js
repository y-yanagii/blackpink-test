import { db } from "~/plugins/firebase";
import { firestoreAction } from 'vuexfire';

const messagesRef = db.collection('messages');

const state = () => ({
  messages: [],
});

const getters = {
  // 順位ごとのメッセージを取得
  getMessage: state => rank => {
    return state.messages.find(m => m.rankingMax >= rank && m.rankingMin <= rank).message
  }
};

const actions = {
  // messagesコレクションの初期化
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('messages', messagesRef)
  }),
};

export default {
  state,
  getters,
  actions,
};
