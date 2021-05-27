import firebase from "~/plugins/firebase";
import { db } from "~/plugins/firebase";
import { firestoreAction } from 'vuexfire';

const rankingsRef = db.collection('rankings');

const state = () => ({
  rankings: [],
});

const getters = {
  orderdRankings: state => {
    // ランキング情報をスコアの降順、クリアタイムの昇順、検定日の降順で取得
    return _.orderBy(state.rankings, ['score', 'clearTime', 'createdAt'], ['desc', 'asc', 'desc'])
  },
  // ログインユーザに紐づくランキングを全て取得
  myRanking: state => twitterId => { return state.rankings.filter(r => r.twitterId === twitterId) },
  // ランキング情報をタイプごと取得
  rankingsByModeType: state => modeType => { return state.rankings.filter(r => r.modeType == modeType) },
  serverTime: () => { return firebase.firestore.FieldValue.serverTimestamp() },
  getRankings: state => { return state.rankings }
};

const actions = {
  // rankingsコレクションの初期化
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('rankings', rankingsRef)
  }),
  add: firestoreAction((context, ranking) => {
    // ランキングをFirestoreへ登録
    rankingsRef.add({
      name: ranking.name,
      twitterId: ranking.twitterId,
      score: ranking.score,
      clearTime: ranking.clearTime,
      modeType: ranking.modeType,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  }),
};

export default {
  state,
  getters,
  actions,
}
