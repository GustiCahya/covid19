import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({
    apiKey: "AIzaSyD-k_OSNjRZkgTonpMhPQ43zvUqWSc9Zx4",
    authDomain: "covid19-2439f.firebaseapp.com",
    projectId: "covid19-2439f",
    storageBucket: "covid19-2439f.appspot.com",
    messagingSenderId: "762126050888",
    appId: "1:762126050888:web:f9b7a404c1514ef9cdda7d"
})

export const auth = firebase.auth();
export const firestore = firebase.firestore();