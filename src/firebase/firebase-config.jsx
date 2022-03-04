import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlSE_TC5k3AW2ucjTjM0aS8hfN1VCnN-s",
  authDomain: "react-login-redux.firebaseapp.com",
  projectId: "react-login-redux",
  storageBucket: "react-login-redux.appspot.com",
  messagingSenderId: "914468567800",
  appId: "1:914468567800:web:13000374a1b5ea1b7b990d",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export { db, googleAuthProvider, firebase };
