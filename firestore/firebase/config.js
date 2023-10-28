// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,collection,addDoc} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyDgdfW8r1uy6wsPmZUDfawJl_Ddp5zASTU",

  authDomain: "dataretiving.firebaseapp.com",

  projectId: "dataretiving",

  storageBucket: "dataretiving.appspot.com",

  messagingSenderId: "826774190223",

  appId: "1:826774190223:web:d2d5b0e302682dd362d8fa"

};

// Initialize Firebase
initializeApp(firebaseConfig);

const firestore = getFirestore();

const MESSAGES = 'messages';

export {
    firestore,
    collection,
    addDoc,
    MESSAGES
};