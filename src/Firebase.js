// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseApp = initializeApp({
    apiKey: "AIzaSyDVVKsiW1aXKeav_YXlFAmb1wX6yfYZAZg",
    authDomain: "final-790a3.firebaseapp.com",
    projectId: "final-790a3",
    storageBucket: "final-790a3.appspot.com",
    messagingSenderId: "123153444069",
    appId: "1:123153444069:web:421f40260ba5269170380c"
});

// Initialize Firebase
export const db = getAuth()
export const database = getFirestore(firebaseApp)