import {RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {getDatabase, onValue, query, ref} from 'firebase/database';
import firebaseApp, {db} from '@/firebase';
import 'firebase/auth';
import {UserStructure} from '@/types/interfaces';
interface CurrentUserProps {
  data: UserStructure;
  id: string;
}
const Members: FC = () => {
  const [email, setEmail] = useState('');
  const [currentUser, setCurrentUser] = useState<CurrentUserProps>({
    data: {},
    id: '',
  });
  // console.log(currentUser);
  const db = getDatabase(firebaseApp);
  useEffect(() => {
    // const starCountRef = query(ref(db, 'users/'));
    // onValue(starCountRef, (snapshot) => {
    //   const data = snapshot.val();
    //   for (const uid in data) {
    //     if (data[uid].email === 'natalyasafarevich@gmail.com') {
    //       setCurrentUser(() => ({data: data[uid], id: uid}));
    //     }
    //   }
    // });
  }, []);

  const addNewMember = () => {
    if (email) {
      const starCountRef = query(ref(db, 'users/'));
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        for (const uid in data) {
          if (data[uid].email === email) {
            setCurrentUser(() => ({data: data[uid], id: uid}));
            return;
          } else {
            alert('польщователь не найден');
          }
        }
      });
    }
  };

  return (
    <div>
      <h1>Поиск пользователя по email</h1>
      <input
        type='email'
        placeholder='Введите email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={addNewMember}>найти</button>
      {currentUser && <p>{currentUser.data.email} - теперь на доску</p>}
    </div>
  );
};

export default Members;
