'use client';
import {FC, useEffect, useState} from 'react';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import CopyBoard from '../Settings/CopyBoard/CopyBoard';
import CloseBoard from '../Settings/CloseBoard/CloseBoard';
import MenuHeader from './MenuHeader/MenuHeader';
import AboutBoardSection from './AboutBoardSection/AboutBoardSection';
import ArchivesSection from './ArchivesSection/ArchivesSection';
import BackgroundSection from './BackgroundSection/BackgroundSection';
import TextColorSection from './TextColorSection/TextColorSection';
import './BoardOptionsMenu.scss';

interface AdditionalMenuProps {
  closeMenu: (value: boolean) => void;
}

const BoardOptionsMenu: FC<AdditionalMenuProps> = ({closeMenu}) => {
  const [isAboutBoardOpen, setIsAboutBoardOpen] = useState(false);
  const [isOpenArchives, setIsOpenArchives] = useState(false);
  const [isOpenBg, setIsOpenBg] = useState(false);
  const [isOpenTextColor, setIsOpenTextColor] = useState(false);
  const [title, setTitle] = useState('Menu');
  const [description, setDescription] = useState<string>('');
  const [descriptionBack, setDescriptionBack] = useState<string>('');

  const boardIndex = useSelector((state: RootState) => state.boards.index);
  const current_board = useSelector(
    (state: RootState) => state.boards.currentBoards,
  );

  useEffect(() => {
    if (current_board?.description) {
      setDescriptionBack(current_board.description);
    }
  }, [current_board?.description]);

  useEffect(() => {
    updateFirebaseData(`boards/${boardIndex}`, {
      description: description,
    });
  }, [description]);

  return (
    <>
      <div className='additional-menu'>
        <div className='additional-menu__container'>
          <div>
            <MenuHeader
              title={title}
              setTitle={setTitle}
              closeMenu={closeMenu}
              setIsAboutBoardOpen={setIsAboutBoardOpen}
              setIsOpenArchives={setIsOpenArchives}
              setIsOpen={setIsOpenBg}
              openStates={[isAboutBoardOpen, isOpenArchives, isOpenBg]}
            />
            <div className='additional-menu__desc'>
              <AboutBoardSection
                setTitle={setTitle}
                setIsAboutBoardOpen={setIsAboutBoardOpen}
                isAboutBoardOpen={isAboutBoardOpen}
                descriptionBack={descriptionBack}
                setDescription={setDescription}
              />
              <ArchivesSection
                setTitle={setTitle}
                setIsOpen={setIsOpenArchives}
                isOpen={isOpenArchives}
              />
              <BackgroundSection
                setTitle={setTitle}
                setIsOpen={setIsOpenBg}
                isOpen={isOpenBg}
              />
              <CopyBoard />
              <TextColorSection
                setIsOpenTextColor={setIsOpenTextColor}
                isOpenTextColor={isOpenTextColor}
              />
            </div>
          </div>
          <CloseBoard />
        </div>
      </div>
    </>
  );
};

export default BoardOptionsMenu;
