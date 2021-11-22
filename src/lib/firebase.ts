import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyB-sBbx_oTiMrG0vzkD-XxPSRcf3MVjCBo",
  authDomain: "duolol-a3fe8.firebaseapp.com",
  projectId: "duolol-a3fe8",
  storageBucket: "duolol-a3fe8.appspot.com",
  messagingSenderId: "491576330311",
  appId: "1:491576330311:web:e4567b742515e89c550962",
  measurementId: "G-D03NNJH6F5"
};

const Firebase = firebase.initializeApp(config);
const firestore = Firebase.firestore()
const { FieldValue } = firebase.firestore

export {Firebase, FieldValue, firestore}