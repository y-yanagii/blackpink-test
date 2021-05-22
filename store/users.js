import { db } from "~/plugins/firebase";
import { firestoreAction } from 'vuexfire';

const usersRef = db.collection('users');

const state = () => ({
  users: [],
  user: {
    name: "",
    twitterId: "",
    description: "",
    photoURL: "",
    privacy: false,
  },
});

const getters = {
  getUser: state => id => { return state.users.filter(user => user.id === id)[0] }
};

const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('users', usersRef);
  }),
  set: firestoreAction((context, usersObject) => {
    debugger
    usersRef.doc(usersObject.id).set({
      name: usersObject.name,
      twitterId: usersObject.twitterId,
      description: usersObject.description,
      photoURL: usersObject.photoURL,
      privacy: usersObject.privacy,
    }, { merge: false });
  }),
  update: firestoreAction((context, usersObject) => {
    usersRef.doc(usersObject.id).update({
      name: usersObject.name,
      twitterId: usersObject.twitterId,
      description: usersObject.description,
      photoURL: usersObject.photoURL,
      privacy: usersObject.privacy,
    });
  })
};

export default {
  state,
  getters,
  actions,
}
