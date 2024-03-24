import firebaseApp from '@/firebase';
import {getDatabase, ref, update} from 'firebase/database';

export async function updateUserData(userId: string, params: {}) {
  const db = getDatabase(firebaseApp);
  try {
    await update(ref(db, 'users/' + userId), params);
    console.log('Data successfully written');
  } catch (error) {
    console.error('Error writing data:', error);
  }
}
