import {updateUserData} from '@/helper/updateUserData';
import {RootState} from '@/store/store';
import {BackgroundImageBoard} from '@/types/interfaces';
import {FC} from 'react';
import {useSelector} from 'react-redux';
interface ColorsProps {
  item: {prop: string};
}
const Colors: FC<ColorsProps> = ({item}) => {
  const user = useSelector((state: RootState) => state.userdata);
  const boardIndex = useSelector((state: RootState) => state.boards.index);

  const changeBg = () => {
    updateUserData(`${user.uid}/boards/${boardIndex}`, {
      currentColor: item.prop,
      currentBg: '',
    });
  };
  return (
    <div
      onClick={changeBg}
      style={{
        width: 50,
        height: 50,
        background: item.prop,
      }}
    ></div>
  );
};

export default Colors;
