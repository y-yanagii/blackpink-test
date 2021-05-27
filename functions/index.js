const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.region('asia-northeast1').https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.updatedStatus = functions.region('asia-northeast1').firestore.document('waitings/{docId}').onWrite((change, context) => {
  // waitingsのステータスが待ちの状態で登録された場合
  console.log("Hello Trigger！");
  return 0;
});