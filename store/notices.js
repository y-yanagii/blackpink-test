import { db } from "~/plugins/firebase";
import { firestoreAction } from 'vuexfire';

const noticesRef = db.collection('notices').orderBy('createdAt', 'desc');

const state = () => ({
  notices: [],
});

const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('notices', noticesRef)
  })
};

export default {
  state,
  actions,
}
