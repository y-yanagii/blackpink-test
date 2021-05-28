const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

const waitingsRef = db.collection('waitings');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.region('asia-northeast1').https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.updatedStatus = functions.region('asia-northeast1').firestore.document('waitings/{docId}').onWrite((change, context) => {
  // waitingsのステータスが待ちの状態で登録された場合
  // 他の待ち状態のステータスを検索
  //let waitingUsers = db.collection('waitings').where("status", "==", 0).limit(5);
  // 自身のdocment idを保持
  let docIds = [];
  docIds.push(context.params.docId);
  
  // 対戦相手取得
  getTargetUserFunc = () => {
    return new Promise(resolve => {
      // ステータスが待ち状態かつ更新日時が1分前のユーザを5件取得
      let query = waitingsRef.where("status", "==", 0).limit(5);
      query.get().then((querySnapshot) => {
        let i = 1;
        const tagetDocCount = Math.floor(Math.random() * (querySnapshot.size + 1 - 1)) + 1; // 1~ドキュメント数の中からランダムにindexを取得
        querySnapshot.forEach(async (doc) => {
          if (i === tagetDocCount && doc.id !== context.params.docId) {
            // 自身以外のステータス待ちユーザのID取得
            docIds.push(doc.id);
            console.log(doc.id, " => ", doc.data());
            resolve();
          }
          i++;
        });
      });
    });
  }

  // 自分と対戦相手をマッチング
  matchUsersFunc = async () => {
    await getTargetUserFunc();
    console.log(docIds);
  };

  matchUsersFunc();

  return 0;
});