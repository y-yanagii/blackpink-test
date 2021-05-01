import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      // storeを個別指定
      paths: [
        "localStorages",
      ]
    })(store)
  })
}
