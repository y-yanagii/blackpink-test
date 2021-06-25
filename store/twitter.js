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
      }).catch(error => {
        // エラー情報を生成
        const arrayMessage = [
          `error location: twitter/loginTwitter`,
          `errorCode: ${error.code}`,
          `errorMessage: ${error.message}`,
        ];
  
        // スラック通知呼び出し
        context.dispatch('errors/sendSlackOfError', { arrayMessage: arrayMessage }, { root: true });
  
        // 500エラー
        $nuxt.error({statusCode: 500});
      })
  },
  logoutTwitter(context, afterAuthenticationFunc) {
    firebase.auth().signOut()
      .then(()=> {
        context.dispatch('localStorages/initializationLocalStorage', '', { root: true }); // twitterアクションからlocalStoragesアクションを呼ぶ
      })
      .catch(error => {
        // エラー情報を生成
        const arrayMessage = [
          `error location: twitter/logoutTwitter`,
          `errorCode: ${error.code}`,
          `errorMessage: ${error.message}`,
        ];
  
        // スラック通知呼び出し
        context.dispatch('errors/sendSlackOfError', { arrayMessage: arrayMessage }, { root: true });
  
        // 500エラー
        $nuxt.error({statusCode: 500});
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
