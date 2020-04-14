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
  measurementId: "G-K1LL6VXR4Y",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//? setting up google popup sign-in
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

//? saving userAuth object to firestore db
export const createUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`); //a documentReference
  const snapShot = await userRef.get(); //a documentSnapshot

  //? when the user not yet exist, create one
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating new user", error.message);
    }
  }

  return userRef; //in case we need it for something else later
};

//? batch upload shop data to firestore (one time use only)
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc(); // we didnt pass any value to doc so the firebase will generate the unique id
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

//? convert shop data collections to an object
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

//?getting currentUser (by creating a promise)
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export default firebase;
