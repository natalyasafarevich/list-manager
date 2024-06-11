import {updateFirebaseData} from '@/helper/updateUserData';
import {RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import './ButtonToFavorites.scss';
import {useSelector} from 'react-redux';

interface ButtonToFavoritesProps {
  path: string;
  isFavorite: boolean;
}
const ButtonToFavorites: FC<ButtonToFavoritesProps> = ({path, isFavorite}) => {
  const [isAdded, setIsAdded] = useState(false);
  const user = useSelector((state: RootState) => state.userdata);
  useEffect(() => {
    path &&
      updateFirebaseData(path, {
        [user.uid]: isAdded,
      });
  }, [isAdded, path, user.uid]);

  useEffect(() => {
    setIsAdded(isFavorite);
  }, [isFavorite]);
  const addToFavorite = () => {
    setIsAdded(!isAdded);
  };
  return <button className={`${isAdded ? 'active' : ''} button-favorite `} onClick={addToFavorite}></button>;
};

export default ButtonToFavorites;
