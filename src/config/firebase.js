// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl_UAx0wCrO3zGIQjVzhNotVjckG0ozOc",
  authDomain: "todolist-app-97716.firebaseapp.com",
  projectId: "todolist-app-97716",
  storageBucket: "todolist-app-97716.appspot.com",
  messagingSenderId: "773382518910",
  appId: "1:773382518910:web:48ee075badfd9bbf69002f",
  measurementId: "G-8VJF20EBJ8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
