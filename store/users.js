import firebase, { db } from "~/plugins/firebase";
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
  getUid: state => { return state.user.uid ? state.user.uid : "home" },
};

const mutations = {
  setUser(state, userObject) {
    state.user.uid = userObject.id;
    state.user.name = userObject.name;
    state.user.twitterId = userObject.twitterId;
    state.user.description = userObject.description;
    state.user.photoURL = userObject.photoURL;
    state.user.privacy = userObject.privacy;
  },
  updateTwitterInfo(state, userObject) {
    state.user.name = userObject.name;
    state.user.photoURL = userObject.photoURL;
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
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    context.dispatch('setUser', userObject);
  }),
  updateTwitter: firestoreAction((context, userObject) => {
    usersRef.doc(userObject.id).update({
      name: userObject.name,
      photoURL: userObject.photoURL,
    });

    context.commit('updateTwitterInfo', userObject);
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
      }
    }).catch(error => {
      // エラー情報を生成
      const arrayMessage = [
        `error location: users/get`,
        `errorCode: ${error.code}`,
        `errorMessage: ${error.message}`,
      ];

      // スラック通知呼び出し
      context.dispatch('errors/sendSlackOfError', { arrayMessage: arrayMessage }, { root: true });

      // 500エラー
      $nuxt.error({statusCode: 500});
    });
  }),
  setUser(context, userObject) {
    // storeのuserにユーザ情報保持
    context.commit('setUser', userObject);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
}
