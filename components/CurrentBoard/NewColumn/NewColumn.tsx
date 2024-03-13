'use client';
import {FC, useEffect, useState} from 'react';
import Column from '../Column/Column';
import {updateUserData} from '@/helper/updateUserData';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {getDatabase, onValue, ref} from 'firebase/database';
import firebaseApp from '@/firebase';
import {v4 as uuidv4} from 'uuid';

interface NewColumnProps {
  currentIndex: number;
}
const NewColumn: FC<NewColumnProps> = ({currentIndex}) => {
  const [components, setComponents] = useState<Array<any>>([]);
  const [currentBoard, setCurrentBoard] = useState({});
  const [currentList, setCurrentList] = useState<any>([]);
  useEffect(() => {
    currentBoard;
  }, []);
  const user = useSelector((state: RootState) => state.userdata);

  useEffect(() => {
    if (user.uid && currentIndex) {
      const db = getDatabase(firebaseApp);
      const starCountRef = ref(db, 'users/' + user.uid + '/boards');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        setCurrentBoard(data[currentIndex]);
        4;

        if (data[currentIndex] && data[currentIndex].lists) {
          setComponents(
            data[currentIndex].lists.map((item: any) => (
              <Column key={item.id} />
            )),
          );
        }
      });
    }
  }, [user.uid, currentIndex]);
  console.log(currentBoard);

  const addComponents = () => {
    const newComponents = [...components, <Column key={uuidv4()} />];
    setComponents(newComponents);
    setCurrentList((prev: any) => [
      ...prev,
      {
        title: '',
        id: uuidv4(),
        name: 'new Column',
      },
    ]);
    updateUserData(`${user.uid}/boards/${currentIndex}`, {lists: currentList});
  };

  return (
    <div className='d-flex align-items-center'>
      {components.map((component, i) => (
        <div className='' key={i}>
          {component}
        </div>
      ))}
      <button onClick={addComponents}>добавить коллонку</button>
    </div>
  );
};

export default NewColumn;
