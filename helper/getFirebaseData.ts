import firebaseApp from '@/firebase';
import {getDatabase, onValue, ref} from 'firebase/database';

export async function getFirebaseData(userId: string, params: string) {
  return new Promise((resolve, reject) => {
    const db = getDatabase(firebaseApp);
    const starCountRef = ref(db, 'users/' + userId + params);
    onValue(
      starCountRef,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      (error) => {
        reject(error);
      },
    );
  });
}
// async function fetchData(userId: string, params: string) {
//   try {
//     const userData = await updateUserData(userId, params);
//     console.log(userData);
//   } catch (error) {
//     console.error(error);
//   }
// }

// fetchData();
