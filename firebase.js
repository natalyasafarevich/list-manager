// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQc7U5R66PkHANs1I5obIFfWV6FDG6UzU",
  authDomain: "list-manager-92969.firebaseapp.com",
  projectId: "list-manager-92969",
  storageBucket: "list-manager-92969.appspot.com",
  messagingSenderId: "520986312952",
  appId: "1:520986312952:web:0d7fc8a0fcc9a3dea7fb0d",
  measurementId: "G-47ENFX1E5S"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);
export default firebaseApp;