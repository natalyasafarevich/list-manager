import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
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
    updateFirebaseData(`boards/${boardIndex}`, {
      currentBg: item.urls,
      currentColor: '',
    });
  };
  return <img src={`${item.urls}&w=400`} onClick={changeBg}></img>;
};

export default Image;
