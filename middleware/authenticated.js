import firebase from '~/plugins/firebase';

export default async function(context) {
  console.log("authenticated");
  const guest = context.store.getters["localStorages/getGuestPlay"];
  if (guest) return; // ゲストの場合認証チェックスキップ
  // Twitter認証済みチェック
  await firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      // ユーザ認証失敗
      console.log("onAuthStateChanged : false");
      // ホーム画面にリダイレクト
      if (context.route.path !== "/") context.redirect('/');
    } else {
      // ユーザ認証成功
      context.store.dispatch('users/get', user.uid);
      console.log("onAuthStateChanged : true");
    }
  })
}
