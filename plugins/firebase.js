import Vue from 'vue';
import { firestorePlugin } from 'vuefire';
import firebase from 'firebase/app';
import 'firebase/firestore';

Vue.use(firestorePlugin)

// firebaseの初期化に必要なプロジェクトIDをオブジェクトで用意
const firebaseConfig = {
  // apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,
  // measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

// 二重に初期化が行われないようチェック
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// 他の場所から使えるようdbを定義しexport
export const db = firebase.firestore();
export default firebase