import firebase from '~/plugins/firebase';

export default async function(context) {
  console.log("authenticated");
  const guest = context.store.getters["localStorages/getGuestPlay"];
  if (guest) return; // ゲストの場合認証チェックスキップ
  // Twitter認証済みチェック
  await firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      console.log("onAuthStateChanged : false");
      // ホーム画面にリダイレクト
      if (context.route.path !== "/") context.redirect('/');
    } else {
      console.log("onAuthStateChanged : true");
    }
  })
}
