import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {RootState} from '@/store/store';
import {FC} from 'react';
import {useSelector} from 'react-redux';
import './Color.scss';
interface ColorsProps {
  item: string;
}
const Colors: FC<ColorsProps> = ({item}) => {
  const user = useSelector((state: RootState) => state.userdata);
  const boardIndex = useSelector((state: RootState) => state.boards.index);

  const changeBg = () => {
    updateFirebaseData(`boards/${boardIndex}`, {
      currentColor: item,
      currentBg: '',
    });
  };
  return (
    <div
      className='color-item'
      onClick={changeBg}
      style={{
        background: item,
      }}
    ></div>
  );
};

export default Colors;
