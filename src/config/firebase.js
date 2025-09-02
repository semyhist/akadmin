
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyBXOAesvNbMTzElbkjdoEchDi5jp4K3v48",
  authDomain: "adminligi.firebaseapp.com",
  projectId: "adminligi",
  storageBucket: "adminligi.firebasestorage.app",
  messagingSenderId: "533349252513",
  appId: "1:533349252513:web:4a7bd6722b22ed84b45fe0"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
