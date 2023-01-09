// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA6EwxeDRI6wngJIuae7TheOR2_iBO8PtA',
  authDomain: 'forum-d5d94.firebaseapp.com',
  projectId: 'forum-d5d94',
  storageBucket: 'forum-d5d94.appspot.com',
  messagingSenderId: '341524952062',
  appId: '1:341524952062:web:e972ac56ba0cb12c9e86af',
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Firebase
export default app;
