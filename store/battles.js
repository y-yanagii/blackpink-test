import firebase, { db } from '~/plugins/firebase';
import { firestoreAction } from 'vuexfire';

const battlesRef = db.collection('battles');

const state = () => ({
  battles: [],
});

const getters = {
  getBattle: state => id => { return state.battles.filter(battle => battle.id === id)[0] },
}

const actions = {
  // ここでコレクションを絞り込み後をバインドするべき
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('battles', battlesRef)
  }),
  winUpdate: firestoreAction(async (context, payload) => {
    // ユーザ情報をreferenceとして保持
    const userDocSnapshot = await firebase.auth().currentUser !== null ? db.collection('users').doc(firebase.auth().currentUser.uid) : "";
    const id = getCurrentUserId(firebase.auth().currentUser);
    // set merge trueでなければ登録あれば追加
    battlesRef.doc(id).set({
      name: payload.name,
      win: firebase.firestore.FieldValue.increment(1),
      twitterId: payload.twitterId,
      user: userDocSnapshot,
    }, { merge: true })
    .catch(error => {
      // エラー情報を生成
      const arrayMessage = [
        `error location: battles/winUpdate`,
        `errorCode: ${error.code}`,
        `errorMessage: ${error.message}`,
      ];

      // スラック通知呼び出し
      context.dispatch('errors/sendSlackOfError', { arrayMessage: arrayMessage }, { root: true });

      // 500エラー
      $nuxt.error({statusCode: 500});
    });
  }),
  loseUpdate: firestoreAction(async (context, payload) => {
    // ユーザ情報をreferenceとして保持
    const userDocSnapshot = await firebase.auth().currentUser !== null ? db.collection('users').doc(firebase.auth().currentUser.uid) : "";
    const id = getCurrentUserId(firebase.auth().currentUser);
    // set merge trueでなければ登録あれば追加
    battlesRef.doc(id).update({
      name: payload.name,
      lose: firebase.firestore.FieldValue.increment(1),
      twitterId: payload.twitterId,
      user: userDocSnapshot,
    }, { merge: true })
    .catch(error => {
      // エラー情報を生成
      const arrayMessage = [
        `error location: battles/loseUpdate`,
        `errorCode: ${error.code}`,
        `errorMessage: ${error.message}`,
      ];

      // スラック通知呼び出し
      context.dispatch('errors/sendSlackOfError', { arrayMessage: arrayMessage }, { root: true });

      // 500エラー
      $nuxt.error({statusCode: 500});
    });
  }),
  drawUpdate: firestoreAction(async (context, payload) => {
    // ユーザ情報をreferenceとして保持
    const userDocSnapshot = await firebase.auth().currentUser !== null ? db.collection('users').doc(firebase.auth().currentUser.uid) : "";
    const id = getCurrentUserId(firebase.auth().currentUser);
    // set merge trueでなければ登録あれば追加
    battlesRef.doc(id).update({
      name: payload.name,
      draw: firebase.firestore.FieldValue.increment(1),
      twitterId: payload.twitterId,
      user: userDocSnapshot,
    }).catch(error => {
      // エラー情報を生成
      const arrayMessage = [
        `error location: battles/drawUpdate`,
        `errorCode: ${error.code}`,
        `errorMessage: ${error.message}`,
      ];

      // スラック通知呼び出し
      context.dispatch('errors/sendSlackOfError', { arrayMessage: arrayMessage }, { root: true });

      // 500エラー
      $nuxt.error({statusCode: 500});
    });
  }, { merge: true }),
}

const mutations = {

}

export default {
  state,
  getters,
  mutations,
  actions,
}

// ユーザ情報取得
function getUser() {

}

// 自分のユーザIDを取得
function getCurrentUserId(currentUser) {
  if (currentUser !== null) {
    // 認証済みの場合
    return currentUser.uid;
  } else {
    // ゲストモードの場合
    return "home";
  }
}