// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBN2eNiOPD-HPIWS7X6MvFb9ScbxgcbNyk",
  authDomain: "my-magazine-4f4fc.firebaseapp.com",
  projectId: "my-magazine-4f4fc",
  storageBucket: "my-magazine-4f4fc.appspot.com",
  messagingSenderId: "446122390229",
  appId: "1:446122390229:web:584cd971addcf8ffb1685c",
  measurementId: "G-6SY0ZP27N3",
};

initializeApp(firebaseConfig);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage();
