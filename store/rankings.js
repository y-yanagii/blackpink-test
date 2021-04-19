import firebase from "~/plugins/firebase";
import { db } from "~/plugins/firebase";
import { firestoreAction } from 'vuexfire';

const rankingsRef = db.collection('rankings');

const state = () => ({
  rankings: [],
  myRank: 0,
});

const getters = {
  orderdRankings: state => {
    // ランキング情報をスコアの降順、クリアタイムの昇順、検定日の降順で取得
    return _.orderBy(state.rankings, ['score', 'clearTime', 'createdAt'], ['desc', 'asc', 'desc'])
  },
};

export const mutaions = {
  setMyRank(state, newRank) {
    state.myRank = newRank
  }
};

const actions = {
  // rankingsコレクションの初期化
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('rankings', rankingsRef)
  }),
  add: firestoreAction((context, rankingObject) => {
    // ランキングをFirestoreへ登録
    rankingsRef.add({
      name: rankingObject.name,
      score: rankingObject.score,
      clearTime: rankingObject.clearTime,
      modeType: rankingObject.modeType,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    // .then((docRef) => {
    //   // 自身のランキングIDを保持
    //   this.dispatch('setMyRank', docRef.id);
    // })
  }),
  setMyRank({ commit }, newRankingId) {
    // mutationsのsetMyRankを呼び出し
    commit('setMyRank', newRankingId);
  }
};

export default {
  state,
  getters,
  actions,
}
