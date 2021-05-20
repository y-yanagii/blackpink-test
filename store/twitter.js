import firebase from "~/plugins/firebase";

const state = () => ({
  user: {
    uid: '',
    name: '',
    isLogin: false,
  },
})

const getters = {
  user: state => {
    return state.user
  }
}

const mutations = {
  getData (state, user) {
    state.user.uid = user.uid
    state.user.name = user.name
  },
  switchLogin (state) {
    state.user.isLogin = true
  },
}

const actions = {
  loginTwitter (context) {
    // Twitter認証処理(ログイン。未登録の場合登録してログイン)
    let provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // Twitter連携認証。未登録の場合登録されuser情報が返る。登録済みの場合もuser情報が返る
      console.log(result);
      debugger
      // ログインチェック処理
      context.dispatch('checkLogin');
    }).catch(function (error) {
      debugger
      console.log(error)
    })
  },
  checkLogin (context) {
    // ログインチェック処理
    firebase.auth().onAuthStateChanged(function (user) {
      debugger
      if (user) {
        context.commit('getData', user)
        context.commit('switchLogin')
      }
    })
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}