import firebase from '~/plugins/firebase';

export default function(context) {
  console.log("authenticated");
  const guest = context.store.getters["localStorages/getGuestPlay"];
  if (guest) return; // ゲストの場合認証チェックスキップ
  // Twitter認証済みチェック
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // ユーザ情報をstoreに設定
      context.store.dispatch("twitter/setUser", user);
      console.log("onAuthStateChanged : true");
    } else {
      console.log("onAuthStateChanged : false");
      // ホーム画面にリダイレクト
      if (context.route.path !== "/") context.redirect('/');
    }
  })
}
