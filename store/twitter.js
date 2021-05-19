import firebase from "~/plugins/firebase";

const state = () => ({
  user: {
    uid: '',
    login: false,
  },
})

const getters = {
  user: state => {
    return state.user
  }
}

const actions = {
  loginTwitter ({ dispatch }) {
    debugger
    let provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      dispatch('checkLogin')
    }).catch(function (error) {
      console.log(error)
    })
  },
  checkLogin ({ commit }) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        commit('getData', { uid: user.uid })
        commit('switchLogin')
      }
    })
  },
}

const mutations = {
  getData (state, payload) {
    state.user.uid = payload.uid
  },
  switchLogin (state) {
    state.user.login = true
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}