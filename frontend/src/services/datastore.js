// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getDatabase, ref, set, update, remove, onValue, push
  } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKe8ZCZU4SWhNylUbaL5NAg4rPrnUP1Zo",
  authDomain: "dali-challenge-6f837.firebaseapp.com",
  projectId: "dali-challenge-6f837",
  storageBucket: "dali-challenge-6f837.appspot.com",
  messagingSenderId: "700824924",
  appId: "1:700824924:web:ada0a07be4156f81955599",
  measurementId: "G-92GLJZ79NG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export function getCategories(callback = ()=> {}){
    const reference = ref(db,"Categories");
    onValue(reference,(snapshot) => {
        const category = snapshot.val();
        callback(category); // sends back the array of cateogires 
    })
}

export function getSpecificCategories(id,callback = ()=> {}){
    const reference = ref(db,"Categories" + id);
    onValue(reference,(snapshot) => {
        const category = snapshot.val();
        callback(category); // sends back the array of cateogires 
    })
}