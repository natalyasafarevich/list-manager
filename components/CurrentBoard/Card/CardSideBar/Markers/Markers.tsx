'use client';
import firebaseApp from '@/firebase';
import {fetchBackDefaultData} from '@/helper/getFirebaseData';
import {updateUserData} from '@/helper/updateUserData';
import {AppDispatch, RootState} from '@/store/store';
import {getDatabase, ref, update} from 'firebase/database';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import ColorCheckbox from '../ColorCheckbox/ColorCheckbox';
import {getMarkersCurrent} from '@/store/card-sidebar/actions';

interface MarkersFirebaseProps {
  color: string;
  id: string;
}
const Markers: FC = () => {
  const [checked, getChecked] = useState<Array<string>>([]);
  const [removedItem, getRemovedItem] = useState<string>('');

  const [markers, getMarkers] = useState<Array<MarkersFirebaseProps>>();
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.userdata);

  useEffect(() => {
    if (user) {
      fetchBackDefaultData('card-settings-data/markers', getMarkers);
    }
  }, [user]);

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (removedItem) {
      const updatedArray = checked.filter((item) => item !== removedItem);
      getChecked(updatedArray);
      console.log(checked, 'updated');
      //
    }
  }, [removedItem]);

  useEffect(() => {
    console.log(checked, 'cheked');
    if (checked.length !== 0) {
      dispatch(getMarkersCurrent(checked));
    }
  }, [checked]);

  const updateCheckedMarks = (e: string) => {
    getChecked((prev) => [...prev, e]);
  };
  return (
    <div className='position-relative'>
      <p onClick={() => setIsOpen(!isOpen)}>метки</p>
      {isOpen && (
        <div
          className='position-absolute p-2'
          style={{
            background: 'white',
            width: '200px',
            right: 0,
            top: 0,
            border: '1px solid black',
          }}
        >
          <div className='d-flex justify-content-between '>
            <span className='text-center'>Метки</span>
            <button onClick={() => setIsOpen(!isOpen)}>x</button>
          </div>
          <div className=''>
            {markers?.map((item, i) => (
              <ColorCheckbox
                key={i}
                data={item}
                addedID={updateCheckedMarks}
                removeID={(e) => getRemovedItem(e)}
              />
              // <div className='d-flex mb-2' key={i}>
              //   <input
              //     data-id={`${item.id}`}
              //     onChange={chooseMark}
              //     type='checkbox'
              //     id={`${item.id}`}
              //     name={`checkbox${i}`}
              //     checked={isChecked}
              //   />
              //   <label
              //     htmlFor={`${item.id}`}
              //     style={{
              //       background: item.color,
              //       width: '100%',
              //       height: '10px',
              //       display: 'flex',
              //     }}
              //   ></label>
              //   <br />
              // </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Markers;
