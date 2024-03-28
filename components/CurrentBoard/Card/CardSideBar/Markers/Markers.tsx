'use client';
import {fetchBackData, fetchBackDefaultData} from '@/helper/getFirebaseData';
import {updateUserData} from '@/helper/updateUserData';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ColorCheckbox from '../ColorCheckbox/ColorCheckbox';
import {getMarkersCurrent} from '@/store/card-sidebar/actions';
import {ColumnCardsProps} from '@/types/interfaces';
import MiniPopup from '@/components/MiniPopup/MiniPopup';

interface MarkersFirebaseProps {
  color: string;
  id: string;
}

const Markers: FC = () => {
  const [card, setCard] = useState<ColumnCardsProps>();
  const [checked, getChecked] = useState<Array<string>>([]);
  const [removedItem, getRemovedItem] = useState<string>('');
  const [markers, getMarkers] = useState<Array<MarkersFirebaseProps>>();
  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector((state: RootState) => state.userdata);
  const current_markers = useSelector(
    (state: RootState) => state.markers.markers,
  );

  const dispatch: AppDispatch = useDispatch();

  // get all default markers
  useEffect(() => {
    if (user) {
      fetchBackDefaultData('card-settings-data/markers', getMarkers);
    }
  }, [user]);

  useEffect(() => {
    if (removedItem) {
      const updatedArray = checked.filter((item) => item !== removedItem);
      getChecked(updatedArray);
    }
  }, [removedItem]);

  // update markers
  useEffect(() => {
    getChecked(current_markers);
    if (current_markers.length !== 0) {
      updateUserData(
        `${user.uid}/boards/${user.dataLink.boardIndex}/lists/${user.dataLink.listIndex}/cards/${user.dataLink.cardIndex}`,
        {
          markers: current_markers,
        },
      );
    }
  }, [current_markers, user.dataLink]);

  // get markers
  useEffect(() => {
    if (user)
      fetchBackData(
        user.uid,
        `/boards/${user.dataLink.boardIndex}/lists/${user.dataLink.listIndex}/cards/${user.dataLink.cardIndex}`,
        setCard,
      );
  }, [user, user.dataLink.listIndex, checked.length]);

  // write current checked items
  useEffect(() => {
    if (checked.length !== 0) {
      dispatch(getMarkersCurrent(checked));
      return;
    }
    if (card?.markers) {
      dispatch(getMarkersCurrent(card.markers));
      return;
    }
  }, [checked, card]);

  const updateCheckedMarks = (e: string) => {
    getChecked((prev) => [...prev, e]);
  };

  return (
    <div className='position-relative'>
      <p onClick={() => setIsOpen(!isOpen)}>метки</p>
      {isOpen && (
        <MiniPopup setIsOpen={(e) => setIsOpen(e)} title='Метки'>
          <div className=''>
            {markers?.map((item, i) => (
              <ColorCheckbox
                key={i}
                data={item}
                addedID={updateCheckedMarks}
                removeID={(e) => getRemovedItem(e)}
              />
            ))}
          </div>
        </MiniPopup>
      )}
    </div>
  );
};

export default Markers;
