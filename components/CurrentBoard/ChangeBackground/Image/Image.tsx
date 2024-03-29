import {updateUserData} from '@/helper/updateUserData';
import {RootState} from '@/store/store';
import {BackgroundImageBoard} from '@/types/interfaces';
import {FC} from 'react';
import {useSelector} from 'react-redux';
interface ImageProps {
  item: BackgroundImageBoard;
}
const Image: FC<ImageProps> = ({item}) => {
  const user = useSelector((state: RootState) => state.userdata);
  const boardIndex = useSelector((state: RootState) => state.boards.index);

  const changeBg = () => {
    updateUserData(`${user.uid}/boards/${boardIndex}`, {
      currentBg: item.urls.full,
      currentColor: '',
    });
  };
  return <img src={item.urls.small} onClick={changeBg}></img>;
};

export default Image;
