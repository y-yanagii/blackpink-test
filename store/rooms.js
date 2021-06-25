import firebase, { db } from '~/plugins/firebase';
import { firestoreAction } from 'vuexfire';

const roomsRef = db.collection('rooms');

const state = () => ({
  rooms: [],
});

const getters = {

}

const actions = {
  // ここでコレクションを絞り込み後をバインドするべき
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('rooms', roomsRef)
  }),
  createCom: firestoreAction((context, payload) => {
    // roomsに空きがない場合、部屋作成
    roomsRef.doc(payload.roomId).set({
      battleResult: {
        result1: {
          firstId: "",
          firstResult: "",
          secondId: "",
          secondResult: "",
        },
        result2: {
          firstId: "",
          firstResult: "",
          secondId: "",
          secondResult: "",
        },
        result3: {
          firstId: "",
          firstResult: "",
          secondId: "",
          secondResult: "",
        },
        result4: {
          firstId: "",
          firstResult: "",
          secondId: "",
          secondResult: "",
        },
        result5: {
          firstId: "",
          firstResult: "",
          secondId: "",
          secondResult: "",
        }
      },
      userIds: [payload.twitterId, "account"],
      version: 0,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    }, { merge: false })
    .catch(error => {
      // エラー情報を生成
      const arrayMessage = [
        `error location: rooms/createCom`,
        `errorCode: ${error.code}`,
        `errorMessage: ${error.message}`,
      ];

      // スラック通知呼び出し
      context.dispatch('errors/sendSlackOfError', { arrayMessage: arrayMessage }, { root: true });

      // 500エラー
      $nuxt.error({statusCode: 500});
    });
  }),
}

const mutations = {

}

export default {
  state,
  getters,
  mutations,
  actions,
}
