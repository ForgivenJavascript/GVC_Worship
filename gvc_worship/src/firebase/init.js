import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBrDMDuzadglmiSiKeHl4N5HMfjJDwraYY",
    authDomain: "gvc-worship.firebaseapp.com",
    projectId: "gvc-worship",
    storageBucket: "gvc-worship.appspot.com",
    messagingSenderId: "498155229965",
    appId: "1:498155229965:web:b55ed266decfa7fb1b5644",
    measurementId: "G-C120GKW1BJ"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firestore = firebaseApp.firestore();
export const auth = firebase.auth();