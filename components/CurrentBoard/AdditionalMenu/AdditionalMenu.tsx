'use client';
import {FC, useEffect, useState} from 'react';
import ProfileCard from '../ProfileCard/ProfileCard';
import TextEditor from '@/components/TextEditor/TextEditor';
import {updateUserData} from '@/helper/updateUserData';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';

import ExpandableContent from '@/components/ExpandableContent/ExpandableContent';
import ArchivedСolumns from '../Column/ArchivedСolumns/ArchivedСolumns';
import CardArchived from '../Card/CardArchived/CardArchived';
import ChangeBackground from '../ChangeBackground/ChangeBackground';

const AdditionalMenu: FC = () => {
  const [description, setDescription] = useState<string>('');
  const [descriptionBack, setDescriptionBack] = useState<string>('');

  const user = useSelector((state: RootState) => state.userdata);
  const boardIndex = useSelector((state: RootState) => state.boards.index);
  const current_board = useSelector(
    (state: RootState) => state.boards.currentBoards,
  );
  console.log(current_board);
  useEffect(() => {
    if (current_board?.description) {
      setDescriptionBack(current_board.description);
    }
  }, [current_board?.description]);
  useEffect(() => {
    updateUserData(`${user.uid}/boards/${boardIndex}`, {
      description: description,
    });
  }, [description]);

  const [isAboutBoardOpen, setIsAboutBoardOpen] = useState(false);
  const [isOpenArchives, setIsOpenArchives] = useState(false);
  const [isOpenBg, setIsOpenBg] = useState(false);

  return (
    <>
      <div className='position-absolute top-0 end-0 bg-info text-light p-4 w-25 z-3'>
        <div className='d-flex justify-content-between align-item-center'>
          {(isAboutBoardOpen || isOpenArchives || isOpenBg) && (
            <button
              onClick={() => {
                setIsAboutBoardOpen(false); // Для описания доски
                setIsOpenArchives(false);
                setIsOpenBg(false);
              }}
            >
              back
            </button>
          )}

          <h4>меню</h4>
          <button>close</button>
        </div>
        <hr />
        <div className='position-relative'>
          <ExpandableContent
            setIsOpen={(e) => setIsAboutBoardOpen(e)}
            isOpen={isAboutBoardOpen}
            title={'О доске'}
          >
            <h5>Администраторы доски</h5>
            <ProfileCard />
            <h5 className='mt-2'>Oписание</h5>
            <TextEditor
              title={'о доске'}
              isArray={false}
              backDescription={descriptionBack}
              getHTML={(e) => setDescription(e)}
            />
          </ExpandableContent>

          <ExpandableContent
            setIsOpen={(e) => setIsOpenArchives(e)}
            isOpen={isOpenArchives}
            title={'Архивы'}
          >
            <div>
              <ArchivedСolumns />
              <CardArchived />
            </div>
          </ExpandableContent>
          <ExpandableContent
            setIsOpen={(e) => setIsOpenBg(e)}
            isOpen={isOpenBg}
            title={'сменить фон'}
          >
            <ChangeBackground />
          </ExpandableContent>
        </div>
      </div>
    </>
  );
};

export default AdditionalMenu;