import firebase, { db } from '~/plugins/firebase';
import { firestoreAction } from 'vuexfire';

const battlesRef = db.collection('battles');

const state = () => ({
  battles: [],
});

const getters = {

}

const actions = {
  // ここでコレクションを絞り込み後をバインドするべき
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('battles', battlesRef)
  }),
  winUpdate: firestoreAction((context, twitterId) => {
    battlesRef.doc(twitterId).set({
      win: firebase.firestore.FieldValue.increment(1),
    }, { merge: true });
  }),
  loseUpdate: firestoreAction((context, twitterId) => {
    battlesRef.doc(twitterId).update({
      lose: firebase.firestore.FieldValue.increment(1),
    }, { merge: true });
  }),
  drawUpdate: firestoreAction((context, twitterId) => {
    battlesRef.doc(twitterId).update({
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
