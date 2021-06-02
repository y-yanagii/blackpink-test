import firebase from '~/plugins/firebase';

export default async function(context) {
  const guest = context.store.getters["localStorages/getGuestPlay"];
  
  if (guest) {
    // ゲストモード時
    if (context.route.name === "profile") {
      // プロフィール画面へは遷移しない
      context.redirect('/');
    }

    return; // ゲストの場合認証チェックスキップ
  }
  // Twitter認証済みチェック
  await firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      // ユーザ認証失敗
      // ホーム画面にリダイレクト
      if (context.route.path !== "/") context.redirect('/');
    } else {
      // ユーザ認証成功
      context.store.dispatch('users/get', user.uid);
    }
  })
}