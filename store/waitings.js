import firebase, { db } from "~/plugins/firebase";
import { firestoreAction } from 'vuexfire';

const waitingsRef = db.collection('waitings');

const state = () => ({
  waitings: [],
});

const getters = {

};

const actions = {
  // ここでコレクションを絞り込み後をバインドするべき
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('waitings', waitingsRef)
  }),
  set: firestoreAction((context, twitterId) => {
    // 待機ユーザとしてステータスを登録or更新
    waitingsRef.doc(twitterId).set({
      roomId: "",
      status: 0,
      updateAt: firebase.firestore.FieldValue.serverTimestamp(),
    }, { merge: false })
    .catch(error => {
      // エラー情報を生成
      const arrayMessage = [
        `error location: waitings/set`,
        `errorCode: ${error.code}`,
        `errorMessage: ${error.message}`,
      ];

      // スラック通知呼び出し
      context.dispatch('errors/sendSlackOfError', { arrayMessage: arrayMessage }, { root: true });

      // 500エラー
      $nuxt.error({statusCode: 500});
    });
  }),
  setCom: firestoreAction((context, uid) => {
    // マッチ済みに登録しCOMと対戦
    waitingsRef.doc(uid).set({
      roomId: Math.random().toString(32).substring(2),
      status: 1,
      updateAt: firebase.firestore.FieldValue.serverTimestamp(),
    }, { merge: false })
    .catch(error => {
      // エラー情報を生成
      const arrayMessage = [
        `error location: waitings/setCom`,
        `errorCode: ${error.code}`,
        `errorMessage: ${error.message}`,
      ];

      // スラック通知呼び出し
      context.dispatch('errors/sendSlackOfError', { arrayMessage: arrayMessage }, { root: true });

      // 500エラー
      $nuxt.error({statusCode: 500});
    })
  }),
}

const mutations = {

}

export default {
  state,
  getters,
  mutations,
  actions,
}