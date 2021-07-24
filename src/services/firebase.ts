import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({

})

export const auth = firebase.auth();
export const firestore = firebase.firestore();