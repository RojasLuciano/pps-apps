// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDO-f1H-ovvRYrjTa1bWnvlnBcrYXnEBoI",
  authDomain: "my-login-48757.firebaseapp.com",
  projectId: "my-login-48757",
  storageBucket: "my-login-48757.appspot.com",
  messagingSenderId: "558322019754",
  appId: "1:558322019754:web:a6c2076da717764e154fd3",
};

const firebaseApp = initializeApp(firebaseConfig);

if (!getApps().length) {
    initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore(firebaseApp);

export default firebaseConfig;