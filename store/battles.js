import firebase, { db } from '~/plugins/firebase';
import { firestoreAction } from 'vuexfire';

const battlesRef = db.collection('battles');

const state = () => ({
  battles: [],
});

const getters = {
  getBattle: state => id => { return state.battles.filter(battle => battle.id === id)[0] },
}

const actions = {
  // ここでコレクションを絞り込み後をバインドするべき
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('battles', battlesRef)
  }),
  winUpdate: firestoreAction((context, payload) => {
    const id = getCurrentUserId(payload.twitterId, firebase.auth().currentUser);
    // set merge trueでなければ登録あれば追加
    battlesRef.doc(id).set({
      name: payload.name,
      win: firebase.firestore.FieldValue.increment(1),
    }, { merge: true });
  }),
  loseUpdate: firestoreAction((context, payload) => {
    const id = getCurrentUserId(payload.twitterId, firebase.auth().currentUser);
    // set merge trueでなければ登録あれば追加
    battlesRef.doc(id).update({
      name: payload.name,
      lose: firebase.firestore.FieldValue.increment(1),
    }, { merge: true });
  }),
  drawUpdate: firestoreAction((context, payload) => {
    const id = getCurrentUserId(payload.twitterId, firebase.auth().currentUser);
    // set merge trueでなければ登録あれば追加
    battlesRef.doc(id).update({
      name: payload.name,
      draw: firebase.firestore.FieldValue.increment(1),
    });
  }, { merge: true }),
}

const mutations = {

}

export default {
  state,
  getters,
  mutations,
  actions,
}

// 自分のユーザIDを取得
function getCurrentUserId(twitterId, currentUser) {
  if (currentUser !== null) {
    // 認証済みの場合
    return currentUser.uid;
  } else {
    // ゲストモードの場合
    return "home";
  }
}