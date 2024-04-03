// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// const {initiaimport {getDatabase, ref, set} from 'firebase/database';lizeApp} = require('firebase-admin/app');
import {getDatabase, ref, set} from 'firebase/database';
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';

// admin.initializeApp({

// Здесь можете указать другие настройки вашего приложения Firebase Admin
// });
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBQc7U5R66PkHANs1I5obIFfWV6FDG6UzU',
  authDomain: 'list-manager-92969.firebaseapp.com',
  databaseURL:
    'https://list-manager-92969-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'list-manager-92969',
  storageBucket: 'list-manager-92969.appspot.com',
  messagingSenderId: '520986312952',
  appId: '1:520986312952:web:0d7fc8a0fcc9a3dea7fb0d',
  measurementId: 'G-47ENFX1E5S',
};
// {credential: admin.credential.applicationDefault()},
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);

// const analytics = getAnalytics(firebaseApp);
export default firebaseApp;
export const findUserByEmail = async (email) => {
  try {
    const usersRef = ref(db, 'users');
    // const q = query(usersRef, orderByChild('email'), equalTo(email));
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error searching user by email:', error);
    throw error;
  }
};
