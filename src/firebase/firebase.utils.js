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

//? saving userAuth object to firestore db
export const createUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`); //a documentReference
  const snapShot = userRef.get(); //a documentSnapshot

  //? when the user not yet exist, create one
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating new user", error.message);
    }
  }

  return userRef; //in case we need it for something else later
};

export default firebase;
