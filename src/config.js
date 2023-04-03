// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1KoHrbQ5FxAz-OXMfwNGBkBC3FXgcWko",
    authDomain: "clever-to-do-list-7e173.firebaseapp.com",
    projectId: "clever-to-do-list-7e173",
    storageBucket: "clever-to-do-list-7e173.appspot.com",
    messagingSenderId: "653042746380",
    appId: "1:653042746380:web:4c846b7291fcbdb9601a29"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export const auth = getAuth(app);
export default database;