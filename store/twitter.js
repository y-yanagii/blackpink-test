import firebase from "~/plugins/firebase";

const state = () => ({
  user: {
    uid: "",
    name: "",
    isLogin: false,
    photoURL: "",
  },
})

const getters = {
  user: state => { return state.user },
  currentUser: state => { return firebase.auth().currentUser() }
}

const mutations = {
  setUser(state, user) {
    state.user.uid = user.uid
    state.user.name = user.displayName
    state.user.isLogin = true
    state.user.photoURL = user.photoURL
  },
  logout(state) {
    state.user = {
      uid: "",
      name: "",
      isLogin: false,
    };
  }
}

const actions = {
  loginTwitter(context) {
    // Twitter認証処理(ログイン。未登録の場合登録してログイン)
    let provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithRedirect(provider)
      .then(function (result) {
        // Twitter連携認証。未登録の場合登録されuser情報が返る。登録済みの場合もuser情報が返る
        // storeにユーザ情報を格納
        context.commit('setUser', result.user);
      }).catch(function (error) {
        console.log(error)
      })
  },
  logoutTwitter(context) {
    firebase.auth().signOut()
      .then(()=> {
        console.log('ログアウト');
        context.commit('logout');
      })
      .catch((error) => {
        console.log(error)
      })
  },
  setUser(context, user) {
    // storeにuser情報を設定
    context.commit('setUser', user);
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}