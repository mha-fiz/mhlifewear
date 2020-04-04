import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA4ZqXdFkd40-LcMts9TTYUEmGGqOm6tq8",
  authDomain: "mhlifewear.firebaseapp.com",
  databaseURL: "https://mhlifewear.firebaseio.com",
  projectId: "mhlifewear",
  storageBucket: "mhlifewear.appspot.com",
  messagingSenderId: "173661740745",
  appId: "1:173661740745:web:86c6734fc699fd9a74f718",
  measurementId: "G-K1LL6VXR4Y"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//? setting up google popup sign-in
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
