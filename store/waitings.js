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
    }, { merge: false });
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