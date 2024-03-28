import {updateUserData} from '@/helper/updateUserData';
import {FC, useEffect, useState} from 'react';
interface ButtonToFavoritesProps {
  path: string;
  isFavorite: boolean;
}
const ButtonToFavorites: FC<ButtonToFavoritesProps> = ({path, isFavorite}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [title, setTitle] = useState('');
  useEffect(() => {
    isAdded
      ? setTitle('удалить из избранных')
      : setTitle('добавить в избранное');
  }, [isAdded]);

  useEffect(() => {
    setIsAdded(isFavorite);
  }, [isFavorite]);

  const addToFavorite = () => {
    setIsAdded(!isAdded);
    updateUserData(path, {isFavorite: !isAdded});
  };
  return <button onClick={addToFavorite}>{title}</button>;
};

export default ButtonToFavorites;
