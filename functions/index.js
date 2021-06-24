const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

const waitingsRef = db.collection('waitings');
const roomsRef = db.collection('rooms');
const youtubesRef = db.collection('youtubes');

const { IncomingWebhook } = require('@slack/webhook');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.region('asia-northeast1').https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.updatedStatus = functions.region('asia-northeast1').firestore.document('waitings/{docId}').onWrite((change, context) => {
  // cloud functionsの無限ループ対策
  if (change.after.data().status === 1) return 0;
  // waitingsのステータスが待ちの状態で登録された場合
  // 他の待ち状態のステータスを検索

  // 自身のdocment idを保持
  let docIds = [];
  docIds.push(context.params.docId);
  
  // 対戦相手取得
  getTargetUserFunc = () => {
    return new Promise(resolve => {
      // ステータスが待ち状態かつ更新日時が1分前のユーザを5件取得
      let query = waitingsRef.where("status", "==", 0).limit(5);
      query.get().then((querySnapshot) => {
        if (querySnapshot.size === 1) {
          // 自分以外待ちなし
          return 0;
        }
        let i = 1;
        const tagetDocCount = Math.floor(Math.random() * (querySnapshot.size + 1 - 1)) + 1; // 1~ドキュメント数の中からランダムにindexを取得
        querySnapshot.forEach(async (doc) => {
          if (i === tagetDocCount && doc.id !== context.params.docId) {
            // 自身以外のステータス待ちユーザのID取得
            docIds.push(doc.id);
            resolve();
          }
          i++;
        });
      });
    });
  }

  // 自分と対戦相手をマッチング、ルームIDの付与
  registRoomId = (targetUsers, newRoomId) => {
    return new Promise(resolve => {
      db.runTransaction(async transaction => {
      return transaction.getAll(targetUsers.doc(docIds[0]), targetUsers.doc(docIds[1])).then(docs => {
        console.log("aet room succeeded");
        // ルームを作成（ステータス監視しているため）
        new Promise(resolve => {
          roomsRef.doc(newRoomId).set({
            userIds: [docIds[0], docIds[1]],
            battleResults: [],
            tests: [],
          });
          resolve();
        }).then(() => {
          return new Promise(resolve => {
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
            resolve();
          })
        })

        // docs.forEach((doc) => {
        //   if (doc.data().status === 0) {
        //     transaction.set(targetUsers.doc(docIds[0]), {
        //       roomId: newRoomId,
        //       status: 1,
        //       updateAt: admin.firestore.FieldValue.serverTimestamp(),
        //     });
        //   } else {
        //     throw "既にマッチ済み"
        //   }
        // });

        resolve();
      }).catch((error) => {
        console.log("transactionのcatch", error);
      });
      });
    })
  }

  // 自分と対戦相手をマッチング
  matchUsersFunc = async () => {
    await getTargetUserFunc();
    console.log(docIds);

    // roomIdの発行
    const newRoomId = Math.random().toString(32).substring(2);
    // マッチしたユーザをトランザクション処理で更新させる、ルームドキュメント作成
    await registRoomId(waitingsRef, newRoomId);

    // TODO 前のコード(不要)
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


    
  };

  matchUsersFunc();

  return 0;
});

// 3日に1度、YouTubeよりBLACKPINKのチャンネルに対しAPIを叩いて最新の動画を５件取得し、firestoreに格納する(日、火、木の19時に1回ずつ)
// exports.youtubeScheduledFunction = functions.region('asia-northeast1').pubsub.schedule('0 19 * * 0,2,4').onRun((context) => {
//   youtubesRef.get().then((res) => {
//     // youtubesコレクションのドキュメントを削除
//     res.forEach(doc => {
//       doc.delete();
//     });

//     const url = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCOmHUn--16B90oW2L6FRR3A&maxResults=5&order=date&type=video&key=AIzaSyD3cpVa0sRfqS3ZYpMXxWYF6Zl2BbV9q8Y";
//     // リクエストGet
//     const response = context.$axios.$get(url);

//     for (let i=0;i<response["items"].length;i++) {
//       // youtubesコレクションに追記
//       db.collection('youtubes').add({
//         orderNum: i,
//         videoId: response["items"][i].id.videoId,
//       });
//     };
//   });

//   return null;
// });

// 1日に1度、roomsのドキュメントを全件削除(使用済みのroomのみ)
exports.roomsDeleteScheduledFunction = functions.region('asia-northeast1').pubsub.schedule('0 3 * * *').timeZone('Asia/Tokyo').onRun((context) => {
  // バトルが終了しているroomsを引っ張って全件削除
  roomsRef.where('version', '==', 1).get().then((docs) => {
    docs.forEach(doc => doc.ref.delete());
    console.log("rooms削除成功");
  }).catch((error) => {
    console.log("rooms削除の定期実行エラー", error);
  });
  return null;
});

// トランザクション処理
// rankingsコレクションにreference型のユーザ情報のフィールド追加
exports.addReferenceUserField = functions.region('asia-northeast1').https.onRequest(async (req, res) => {
  res.send('reference型のユーザ情報をrankingsコレクションに追加する関数を発動');

  // ランキングコレクション取得
  let rankingsSnapshots = await db.collection('rankings').get();

  // batch処理
  const batch = db.batch();
  let i = 0;
  // ランキングドキュメントリストをループ
  rankingsSnapshots.docs.forEach(async (doc) => {
    let userDocRef = await db.collection('users').where("twitterId", "==", doc.get("twitterId")).get();
    let userRef = db.collection('users').doc(userDocRef.docs[0].ref.id);
    console.log(userDocRef.docs[0].ref.id);
    batch.update(doc.ref, { user: userRef });
    i++;
    if (i === rankingsSnapshots.docs.length) {
      // 最後のアップデート終了後
      // 変更をコミット
      batch.commit();
    }
  });
});

// ユーザ登録時、スラック通知
exports.sendToSlack = functions.auth.user().onCreate(async (user) => {
  console.log("fewfwefewfwfef");
  await sendWebhookSlack.send({
    text: '新たにユーザ登録:' + user
  });
  return null;
});
