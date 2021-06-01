import { db } from '~/plugins/firebase';
import { firestoreAction } from 'vuexfire';

const roomsRef = db.collection('rooms');

const state = () => ({
  rooms: [],
});

const getters = {

}

const actions = {
  // ここでコレクションを絞り込み後をバインドするべき
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('rooms', roomsRef)
  }),
  create: firestoreAction(() => {
    // roomsに空きがない場合、部屋作成
    roomsRef.add({});
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
