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
import {v4 as uuidv4} from 'uuid';
import './Markers.scss';
import CustomMarker from './CustomMarker/CustomMarker';
const key1 = uuidv4();
const key2 = uuidv4();
const key3 = uuidv4();
const key4 = uuidv4();
const key5 = uuidv4();
const marker = {
  [key1]: {
    color: '#f5cd47',
    id: key1,
    text: '',
  },
  [key2]: {
    color: '#f5cd',
    id: key2,
    text: '',
  },
  [key3]: {
    color: '#f5cd96',
    id: key3,
    text: '',
  },
  [key4]: {
    color: 'blue',
    id: key4,
    text: '',
  },
  [key5]: {
    color: 'red',
    id: key5,
    text: '',
  },
};
interface MarkersFirebaseProps {
  color: string;
  id: string;
  text: string;
}

const Markers: FC = () => {
  const [card, setCard] = useState<ColumnCardsProps>();
  const [checked, getChecked] = useState<any>({});
  const [removedItem, getRemovedItem] = useState<string>('');
  const [markers, getMarkers] = useState<any>({});
  const [isOpen, setIsOpen] = useState(false);

  const [customMarkers, getCustomMarkers] = useState<any>({});

  const user = useSelector((state: RootState) => state.userdata);
  const current_markers = useSelector(
    (state: RootState) => state.markers.markers,
  );
  const isLoggedIn = !!user.current_info.uid && user.user_status !== 'guest';

  const dispatch: AppDispatch = useDispatch();

  // if custom marker is created
  useEffect(() => {
    if (customMarkers)
      if (Object.keys(customMarkers).length) {
        updateFirebaseData('card-settings-data', {
          'custom-markers': {[user.current_info.uid]: customMarkers},
        });
      }
  }, [customMarkers]);

  // get all default markers
  useEffect(() => {
    if (user) {
      // updateFirebaseData('card-settings-data', {markers: marker});
      fetchBackDefaultData('card-settings-data/markers', getMarkers);
      fetchBackDefaultData(
        `card-settings-data/custom-markers/${user.current_info.uid}`,
        getCustomMarkers,
      );
    }
  }, [user]);

  useEffect(() => {
    if (removedItem) {
      const updatedChecked = {...checked};
      delete updatedChecked[removedItem];
      getChecked(updatedChecked);
    }
  }, [removedItem]);

  // update markers
  useEffect(() => {
    //
    if (Object.keys(current_markers).length !== 0) {
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
  }, [user, user.dataLink.listIndex, checked]);

  // write current checked items

  useEffect(() => {
    if (Object.keys(checked).length) {
      dispatch(getMarkersCurrent(checked));
      return;
    }
    if (card?.markers) {
      dispatch(getMarkersCurrent(card.markers));
      return;
    }
  }, [checked, card]);

  const updateCheckedMarks = (
    value: string,
    text: any,
    id: any,
    isCustom?: boolean,
  ) => {
    getChecked((prev: any) => ({
      ...prev,
      [id]: {color: value, text: text, id: id},
    }));
    if (isCustom) {
      getCustomMarkers((prev: any) => ({
        ...prev,
        [id]: {color: value, text: text, id: id},
      }));
    }
  };
  const [isCustomTag, setIsCustomTag] = useState(false);
  return (
    <div className='tags'>
      <div className='tags__container'>
        <p
          className='tags__title card-sidebar-title underline'
          onClick={() => {
            // if (!isLoggedIn) {
            //   return;
            // }
            setIsOpen(!isOpen);
          }}
        >
          Tags
        </p>

        {isOpen && (
          <div className='tags__popup'>
            <MiniPopup setIsOpen={(e) => setIsOpen(e)} title='Tags'>
              {isCustomTag ? (
                <CustomMarker
                  isOpen={(state) => setIsCustomTag(state)}
                  updateCheckedMarks={updateCheckedMarks}
                />
              ) : (
                <>
                  {Object.keys(markers)?.map((item, i) => (
                    <div className='tags__box' key={i}>
                      <ColorCheckbox
                        data={markers[item]}
                        addedID={updateCheckedMarks}
                        removeID={(e) => getRemovedItem(e)}
                      />
                    </div>
                  ))}
                  {Object.keys(customMarkers)?.map((item, i) => (
                    <div className='tags__box' key={i}>
                      <ColorCheckbox
                        data={customMarkers[item]}
                        addedID={updateCheckedMarks}
                        removeID={(e) => getRemovedItem(e)}
                      />
                    </div>
                  ))}
                  <button
                    className='tags__button button-border'
                    onClick={(_e) => setIsCustomTag(!isCustomTag)}
                  >
                    Create a tag
                  </button>
                </>
              )}
            </MiniPopup>
          </div>
        )}
      </div>
    </div>
  );
};

export default Markers;
