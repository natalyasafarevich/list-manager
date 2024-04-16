'use client';
import React, {FC, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';

interface TextColorProps {
  title: string;
  text: string;
}

const TextColor: FC<TextColorProps> = ({title, text}) => {
  const [isClicked, setIsClicked] = useState(false);
  const boardIndex = useSelector((state: RootState) => state.boards.index);

  const theme = useSelector((state: RootState) => state.boards.currentBoards);
  // console.log(theme);
  const handleClick = () => {
    setIsClicked(!isClicked);
    const newData = {
      'text-color': text,
    };
    updateFirebaseData(`boards/${boardIndex}`, newData);
  };

  return (
    <div className='text-color-button'>
      <button
        onClick={handleClick}
        data-color={title}
        className={theme['text-color'] === title ? 'active' : ''}
      >
        {title}
      </button>
    </div>
  );
};

export default TextColor;
