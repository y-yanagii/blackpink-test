import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'blackpinkkey',
    paths: ['localStorages']
  })(store)
}
