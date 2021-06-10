import firebase from "~/plugins/firebase";

const state = () => ({});

const getters = {}

const mutations = {}

const actions = {
  loginTwitter(context, afterAuthenticationFunc) {
    // Twitter認証処理(ログイン。未登録の場合登録してログイン)
    let provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(function (result) {
        // Twitter連携認証。未登録の場合登録されuser情報が返る。登録済みの場合もuser情報が返る
        // ユーザ情報を取得し、ユーザ情報登録
        let userObject = {
          id: result.user.uid,
          name: result.additionalUserInfo.profile.name,
          twitterId: result.additionalUserInfo.username,
          description: result.additionalUserInfo.profile.description,
          photoURL: result.user.photoURL,
          privacy: false,
        }
        context.dispatch('users/set', userObject, { root: true }); // twitterアクションからusersアクションを呼ぶ
        context.dispatch('localStorages/setUserNameTwitterId', { name: result.additionalUserInfo.profile.name, twitterId: result.additionalUserInfo.username }, { root: true }); // twitterアクションからlocalStoragesアクションを呼ぶ

        // 第二引数のコールバック関数呼び出し（認証したユーザ情報を元に、スナックバー通知とステータス登録）
        afterAuthenticationFunc();

        console.log("login");
      }).catch(function (error) {
        console.log(error)
      })
  },
  logoutTwitter(context, afterAuthenticationFunc) {
    firebase.auth().signOut()
      .then(()=> {
        context.dispatch('localStorages/initializationLocalStorage', '', { root: true }); // twitterアクションからlocalStoragesアクションを呼ぶ
      })
      .catch((error) => {
        console.log(error);
      })
  },
  updateTwitter(context) {
    // 現在のユーザ情報から最新のユーザ情報を取得
    let user = firebase.auth().currentUser;
    
    // ユーザ情報を取得し、ユーザ情報登録
    let userObject = {
      id: user.uid,
      name: user.providerData[0].displayName,
      photoURL: user.providerData[0].photoURL,
    }

    context.dispatch('users/updateTwitter', userObject, { root: true }); // twitterアクションからusersアクションを呼ぶ
    context.dispatch('localStorages/setUserName', userObject.name, { root: true }); // twitterアクションからlocalStoragesアクションを呼ぶ
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
