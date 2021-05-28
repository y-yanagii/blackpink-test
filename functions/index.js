const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

const waitingsRef = db.collection('waitings');
// const roomsRef = db.collection('rooms');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.region('asia-northeast1').https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.updatedStatus = functions.region('asia-northeast1').firestore.document('waitings/{docId}').onWrite((change, context) => {

  // cloud functionsの無限ループ対策
  if (change.after.data().status === 1) return;

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
    // マッチしたユーザをトランザクション処理で更新させる
    // let targetUsers = waitingsRef.where(admin.firestore.FieldPath.documentId(), 'in', docIds);
    let targetUsers = waitingsRef;
    
    // db.runTransaction(async (transaction) => {
    //   transaction.get(targetUsers).then((querySnapshot) => {
    //     querySnapshot.forEach(async (doc) => {
    //       console.log("transactionのDoc",doc.data());
    //       if (doc.status === 0) {
    //         // ステータスが待ちの場合
    //         transaction.update(doc, { status: 1 });
    //       }
    //     })
    //   });
    // }).then(() => {
    //   // roomの作成
    //   console.log("transactionのthen");
    // }).catch((error) => {
    //   console.log("transactionのcatch", error);
    // });
    console.log("Transaction succeeded");
    // db.runTransaction(async t => {
    //   console.log("Transaction succeeded");
    //   return t.getAll(targetUsers.doc(docIds[0]), targetUsers.doc(docIds[1])).then(docs => {
    //     console.log("Transaction succeeded");
    //     // const id1 = docs[0];
    //     // const id2 = docs[1];
    //     // console.log(docs);
    //     t.set(targetUsers.doc(docIds[0]), {
    //       status: 1,
    //     });
        
    //     // if (!(id1.exists && id2.exists)) {
    //     // } else {
    //     // // throw error
    //     // }
    //     })
    //   }).then(() => {
    //     console.log("Transaction succeeded");
    //   }).catch((error) => {
    //     console.log("transactionのcatch", error);
    //   });


    db.runTransaction(async transaction => {
      return transaction.getAll(targetUsers.doc(docIds[0]), targetUsers.doc(docIds[1])).then(docs => {
        // roomIdの発行
        const newRoomId = Math.random().toString(32).substring(2);
        // 自身と対戦相手のステータスをマッチにし、ルームIDを付与
        transaction.set(targetUsers.doc(docIds[0]), {
          roomId: newRoomId,
          status: 1,
          updateAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        transaction.set(targetUsers.doc(docIds[1]), {
          roomId: newRoomId,
          status: 1,
          updateAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      });
    });
  };

  matchUsersFunc();

  return 0;
});