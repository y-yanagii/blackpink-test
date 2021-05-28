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
  
  // ステータスが待ち状態かつ更新日時が1分前のユーザを5件取得
  let query = waitingsRef.where("status", "==", 0).limit(5);

  query.get().then((querySnapshot) => {
    let i = 1;
    const tagetDocCount = Math.floor(Math.random() * (querySnapshot.size + 1 - 1)) + 1; // 1~ドキュメント数の中からランダムにindexを取得
    querySnapshot.forEach((doc) => {
      if (i === tagetDocCount) {
        console.log(doc.id, " => ", doc.data());
        console.log("i : ", i);
        console.log("tagetDocCount : ", tagetDocCount);
      }
      i++;
    });
  })

  console.log(change.after.data());
  return 0;
});