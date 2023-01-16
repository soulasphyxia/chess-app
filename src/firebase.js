import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

//you can either add your firebase config directly like in the tutorial or can also add it as an 
//json string like here https://create-react-app.dev/docs/adding-custom-environment-variables/

const firebaseConfig = {
  apiKey: "AIzaSyBr3sTQeqvEXdUVKuYsn0gIbTE7yHnux50",
  authDomain: "react-chess-76dd5.firebaseapp.com",
  projectId: "react-chess-76dd5",
  storageBucket: "react-chess-76dd5.appspot.com",
  messagingSenderId: "616072258723",
  appId: "1:616072258723:web:3c7212a96eb55e07db0b16"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()
export const auth = firebase.auth()
export default firebase