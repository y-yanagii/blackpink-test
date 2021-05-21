import { db } from "~/plugins/firebase";
import { firestoreAction } from 'vuexfire';

const statusesRef = db.collection('statuses');

const state = () => ({
  statuses: [],
  status: {},
});

const getters = {
  getStatus: state => id => { return state.statuses.filter(status => status.id === id)[0] }
};

const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('statuses', statusesRef);
  }),
  set: firestoreAction((context, statusObject) => {
    statusesRef.doc(statusObject.id).set({
      privacy: statusObject.privacy
    }, { merge: false });
  }),
  update: firestoreAction((context, statusObject) => {
    statusesRef.doc(statusObject.id).update({
      privacy: statusObject.privacy
    });
  })
};

export default {
  state,
  getters,
  actions,
}
