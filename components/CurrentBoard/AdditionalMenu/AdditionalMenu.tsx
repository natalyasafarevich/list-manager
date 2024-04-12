'use client';
import {FC, useEffect, useState} from 'react';
import ProfileCard from '../Settings/ProfileCard/ProfileCard';
import TextEditor from '@/components/TextEditor/TextEditor';
import {updateFirebaseData, updateUserData} from '@/helper/updateUserData';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import ExpandableContent from '@/components/ExpandableContent/ExpandableContent';
import ArchivedСolumns from '../Column/ArchivedСolumns/ArchivedСolumns';
import CardArchived from '../Card/CardArchived/CardArchived';
import ChangeBackground from '../ChangeBackground/ChangeBackground';
import CopyBoard from '../Settings/CopyBoard/CopyBoard';
import TextColor from '../Settings/TextColor/TextColor';
import CloseBoard from '../Settings/CloseBoard/CloseBoard';
import './AdditionalMenu.scss';

interface AdditionalMenuProps {
  closeMenu: (value: boolean) => void;
}

const AdditionalMenu: FC<AdditionalMenuProps> = ({closeMenu}) => {
  const [description, setDescription] = useState<string>('');
  const [descriptionBack, setDescriptionBack] = useState<string>('');

  const boardIndex = useSelector((state: RootState) => state.boards.index);
  const current_board = useSelector(
    (state: RootState) => state.boards.currentBoards,
  );
  console.log(current_board.members);
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

  const [isAboutBoardOpen, setIsAboutBoardOpen] = useState(false);
  const [isOpenArchives, setIsOpenArchives] = useState(false);
  const [isOpenBg, setIsOpenBg] = useState(false);
  const [isOpenTextColor, setIsOpenTextColor] = useState(false);
  const members = useSelector((state: RootState) => state.members.members);

  const [title, setTitle] = useState('Menu');
  return (
    <>
      <div className='additional-menu'>
        <div className='additional-menu__container'>
          <div className='additional-menu__headline'>
            {(isAboutBoardOpen || isOpenArchives || isOpenBg) && (
              <button
                className='additional-menu__button button-back'
                onClick={() => {
                  setTitle('Menu');
                  setIsAboutBoardOpen(false);
                  setIsOpenArchives(false);
                  setIsOpenBg(false);
                }}
              ></button>
            )}
            <p className='additional-menu__title'>{title}</p>
            <button
              className='additional-menu__button button-close'
              onClick={() => closeMenu(false)}
            ></button>
          </div>

          <div className=''>
            <ExpandableContent
              setTitle={(e) => setTitle(e)}
              setIsOpen={(e) => setIsAboutBoardOpen(e)}
              isOpen={isAboutBoardOpen}
              title={'About the board'}
            >
              <p className='additional-menu__subtitle'>Board members:</p>
              <div className='flex additional-menu__row'>
                {members.map((member: any, i: number) => (
                  <div className='additional-menu__member' key={i}>
                    <ProfileCard userData={member} />
                  </div>
                ))}
              </div>

              <p className='additional-menu__subtitle'>Description:</p>
              <TextEditor
                title={'write some words about the board'}
                isArray={false}
                backDescription={descriptionBack}
                getHTML={(e) => setDescription(e)}
              />
            </ExpandableContent>

            <ExpandableContent
              setTitle={(e) => setTitle(e)}
              setIsOpen={(e) => setIsOpenArchives(e)}
              isOpen={isOpenArchives}
              title={'Archives'}
            >
              <div>
                <ArchivedСolumns />
                <CardArchived />
              </div>
            </ExpandableContent>
            <ExpandableContent
              setTitle={(e) => setTitle(e)}
              setIsOpen={(e) => setIsOpenBg(e)}
              isOpen={isOpenBg}
              title={'Change the background'}
            >
              <ChangeBackground />
            </ExpandableContent>
            <CopyBoard />
            <div className=''>
              <p onClick={() => setIsOpenTextColor(!isOpenTextColor)}>
                Текст доски
              </p>
              {isOpenTextColor && (
                <div className=''>
                  <TextColor title='light' text='light' />
                  <TextColor title='dark' text='dark' />
                </div>
              )}
            </div>
            <CloseBoard />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalMenu;
