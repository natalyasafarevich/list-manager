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

export async function getDefaultData(path: string) {
  return new Promise((resolve, reject) => {
    const db = getDatabase(firebaseApp);
    const starCountRef = ref(db, path);
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
export const fetchBackDefaultData = async (
  path: string,
  getUserData: (a: any) => void,
) => {
  try {
    const columnData = await getDefaultData(path);
    getUserData(columnData);
  } catch (error) {
    alert(error + 'error in new column');
  }
};

export const fetchBackData = async (
  id: string,
  path: string,
  getUserData: (a: any) => void,
) => {
  try {
    const columnData = await getFirebaseData(id, path);
    getUserData(columnData);
  } catch (error) {
    alert(error + '/fetchBackData/');
  }
};
