import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAHhDfJmQMkOOVGVqcP9ix-2zdmK2tNiLQ",
  authDomain: "possible-bee-405407.firebaseapp.com",
  projectId: "possible-bee-405407",
  storageBucket: "possible-bee-405407.appspot.com",
  messagingSenderId: "539039910845",
  appId: "1:539039910845:web:92e83873e79ca0d797a0d4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)