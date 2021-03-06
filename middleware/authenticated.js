import firebase from '~/plugins/firebase';

export default async function(context) {
  const guest = context.store.getters["localStorages/getGuestPlay"];
  if (guest) {
    // ゲストモード時
    if (context.route.name === "profile") {
      // プロフィール画面へは遷移しない
      context.store.dispatch('messages/setSnackbarText', "ログインしてください");
      context.redirect('/');
    } else if (context.route.name === process.env.MANAGEMENT_URL) {
      // ゲストモード時は問答無用でマネジメント画面に遷移させない
      context.next(false);
    }

    return; // ゲストの場合認証チェックスキップ
  }
  // Twitter認証済みチェック
  await firebase.auth().onAuthStateChanged((user) => {
    if (context.route.name === process.env.MANAGEMENT_URL) {
      // マネジメント画面に関しては管理者のみ
      let currentUser = firebase.auth().currentUser;
      if (currentUser.uid !== process.env.ADMIN_UID) context.next(false);
    }
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