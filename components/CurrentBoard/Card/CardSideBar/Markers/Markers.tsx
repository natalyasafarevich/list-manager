'use client';
import {fetchBackData, fetchBackDefaultData} from '@/helper/getFirebaseData';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {AppDispatch, RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ColorCheckbox from '../ColorCheckbox/ColorCheckbox';
import {getMarkersCurrent} from '@/store/card-sidebar/actions';
import {ColumnCardsProps} from '@/types/interfaces';
import MiniPopup from '@/components/MiniPopup/MiniPopup';
import './Markers.scss';

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
    //
    if (current_markers.length !== 0) {
      getChecked(current_markers);
      updateFirebaseData(
        `boards/${user.dataLink.boardIndex}/lists/${user.dataLink.listIndex}/cards/${user.dataLink.cardIndex}`,
        {
          markers: current_markers,
        },
      );
    }
  }, [current_markers, user.dataLink]);

  // get markers
  useEffect(() => {
    if (user)
      fetchBackDefaultData(
        `boards/${user.dataLink.boardIndex}/lists/${user.dataLink.listIndex}/cards/${user.dataLink.cardIndex}`,
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

  const isLoggedIn = !!user.uid && user.user_status !== 'guest';

  return (
    <div className='tags'>
      <div className='tags__container'>
        <p
          className='tags__title card-sidebar-title underline'
          onClick={() => {
            if (!isLoggedIn) {
              return;
            }
            setIsOpen(!isOpen);
          }}
        >
          Tags
        </p>
        {isOpen && (
          <MiniPopup setIsOpen={(e) => setIsOpen(e)} title='Tags'>
            <div className='tags__'>
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
    </div>
  );
};

export default Markers;
