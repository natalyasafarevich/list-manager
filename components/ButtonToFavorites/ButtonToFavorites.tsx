import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {RootState} from '@/store/store';
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
interface ButtonToFavoritesProps {
  path: string;
  isFavorite: boolean;
}
const ButtonToFavorites: FC<ButtonToFavoritesProps> = ({path, isFavorite}) => {
  const [isAdded, setIsAdded] = useState(false);
  const user = useSelector((state: RootState) => state.userdata);
  const [title, setTitle] = useState('');
  useEffect(() => {
    updateFirebaseData(path, {
      [user.uid]: isAdded,
    });
    isAdded
      ? setTitle('удалить из избранных')
      : setTitle('добавить в избранное');
  }, [isAdded]);

  useEffect(() => {
    setIsAdded(isFavorite);
  }, [isFavorite]);
  console.log(isFavorite, 'isFavorite');
  const addToFavorite = () => {
    setIsAdded(!isAdded);
    console.log(isAdded, 'isAdded');
  };
  return <button onClick={addToFavorite}>{title}</button>;
};

export default ButtonToFavorites;
