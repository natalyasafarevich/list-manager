import firebaseApp from '@/firebase';
import {getDatabase, onValue, ref} from 'firebase/database';

export async function UpdateInRealTime(path: string, getData: (a: any) => void) {
  const db = getDatabase(firebaseApp);
  const current_data = ref(db, path);
  onValue(current_data, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      getData(data);
    }
  });
}
