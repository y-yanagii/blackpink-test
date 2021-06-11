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
    // set merge trueでなければ登録あれば追加
    battlesRef.doc(payload.twitterId).set({
      name: payload.name,
      win: firebase.firestore.FieldValue.increment(1),
    }, { merge: true });
  }),
  loseUpdate: firestoreAction((context, payload) => {
    // set merge trueでなければ登録あれば追加
    battlesRef.doc(payload.twitterId).update({
      name: payload.name,
      lose: firebase.firestore.FieldValue.increment(1),
    }, { merge: true });
  }),
  drawUpdate: firestoreAction((context, payload) => {
    // set merge trueでなければ登録あれば追加
    battlesRef.doc(payload.twitterId).update({
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
