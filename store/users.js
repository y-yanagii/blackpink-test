import { db } from "~/plugins/firebase";
import { firestoreAction } from 'vuexfire';

const usersRef = db.collection('users');

const state = () => ({
  users: [],
  user: {
    uid: "",
    name: "",
    twitterId: "",
    description: "",
    photoURL: "",
    privacy: false,
  },
});

const getters = {
  getUser: state => id => { return state.users.filter(user => user.id === id)[0] },
  getCurrentUser: state => { return state.user },
};

const mutations = {
  setUser(state, userObject) {
    state.user.uid = userObject.id;
    state.user.name = userObject.name;
    state.user.twitterId = userObject.twitterId;
    state.user.description = userObject.description;
    state.user.photoURL = userObject.photoURL;
    state.user.privacy = userObject.privacy;
  }
}

const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('users', usersRef);
  }),
  set: firestoreAction((context, userObject) => {
    usersRef.doc(userObject.id).get().then((doc) => {
      if (!doc.exists) {
        // ドキュメントが存在しない場合、usersに登録
        usersRef.doc(userObject.id).set({
          name: userObject.name,
          twitterId: userObject.twitterId,
          description: userObject.description,
          photoURL: userObject.photoURL,
          privacy: userObject.privacy,
        }, { merge: false });
      }

      context.dispatch('setUser', userObject);
    })
  }),
  update: firestoreAction((context, userObject) => {
    usersRef.doc(userObject.id).update({
      name: userObject.name,
      twitterId: userObject.twitterId,
      description: userObject.description,
      photoURL: userObject.photoURL,
      privacy: userObject.privacy,
    });

    context.dispatch('setUser', userObject);
  }),
  get: firestoreAction((context, id) => {
    usersRef.doc(id).get().then((doc)=>{
      if (doc.exists) {
        // ドキュメント取得ができた場合
        let user = doc.data();
        user.id = id;
        context.dispatch('setUser', user);
      }
      else {
        // ドキュメントが取得できなかった場合
        console.log("404");
      }
    })
  }),
  setUser(context, userObject) {
    // storeのuserにユーザ情報保持
    context.commit('setUser', userObject);
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
}
