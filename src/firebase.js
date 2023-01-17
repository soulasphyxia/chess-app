import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBr3sTQeqvEXdUVKuYsn0gIbTE7yHnux50",
  authDomain: "react-chess-76dd5.firebaseapp.com",
  projectId: "react-chess-76dd5",
  storageBucket: "react-chess-76dd5.appspot.com",
  messagingSenderId: "616072258723",
  appId: "1:616072258723:web:3c7212a96eb55e07db0b16"
};


firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()
export const auth = firebase.auth()
export default firebase