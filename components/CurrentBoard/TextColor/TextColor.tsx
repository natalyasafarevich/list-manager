import React, {FC, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {updateUserData} from '@/helper/updateUserData';

interface TextColorProps {
  title: string;
  text: string;
}

const TextColor: FC<TextColorProps> = ({title, text}) => {
  const [isClicked, setIsClicked] = useState(false);
  const user = useSelector((state: RootState) => state.userdata);
  const boardIndex = useSelector((state: RootState) => state.boards.index);
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsClicked(!isClicked);
    const newData = {
      'text-color': text,
    };
    updateUserData(`${user.uid}/boards/${boardIndex}`, newData);
  };

  return (
    <div>
      <button
        style={
          {
            // width: '100px',
            // height: '30px',
            // border: 'none',
            // cursor: 'pointer',
          }
        }
        onClick={handleClick}
      >
        {title}
      </button>
    </div>
  );
};

export default TextColor;
