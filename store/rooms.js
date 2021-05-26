import { db } from '~/plugins/firebase';
import { firestoreAction } from 'vuexfire';

const roomsRef = db.collection('rooms');

const state = () => ({
  rooms: [],
});

const getters = {

}

const actions = {

}

const mutations = {

}

export default {
  state,
  getters,
  mutations,
  actions,
}
