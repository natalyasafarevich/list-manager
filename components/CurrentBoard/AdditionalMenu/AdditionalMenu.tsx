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
    if (current_board.description) {
      setDescriptionBack(current_board.description);
    }
  }, [current_board.description]);
  useEffect(() => {
    updateUserData(`${user.uid}/boards/${boardIndex}`, {
      description: description,
    });
  }, [description]);
  const [isAboutBoardOpen, setIsAboutBoardOpen] = useState(false);
  // const [isOpenArchives, setIsOpenArchives] = useState(false);

  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [isOpenArchives, setIsOpenArchives] = useState(false);
  console.log(isCardOpen);
  useEffect(() => {
    if (isOpenArchives || isOpen) {
      setIsCardOpen(true);
    } else {
      setIsCardOpen(false);
    }
  }, [isOpenArchives, isOpen]);
  return (
    <>
      <div className='position-absolute top-0 end-0 bg-info text-light p-4 w-25 z-3'>
        <div className='d-flex justify-content-between align-item-center'>
          {(isAboutBoardOpen || isOpenArchives) && (
            <button
              onClick={() => {
                setIsAboutBoardOpen(false); // Для описания доски
                setIsOpenArchives(false); // Для архивов
              }}
            >
              back
            </button>
          )}

          <h4>меню</h4>
          <button>close</button>
        </div>
        <hr />

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
            {/* <p>колонки</p> */}
            <ArchivedСolumns />
            <CardArchived />
            {/* <ArchivedСolumns />
      <CardArchived /> */}
          </div>
        </ExpandableContent>
        {/* )} */}
        {/* {isAboutBoardOpen && !isOpenArchives && ( */}
        {/* <div>
            <h5>Администраторы доски</h5>
            <ProfileCard />
            <h5 className='mt-2'>Oписание</h5>
            <TextEditor
              title={'title'}
              isArray={false}
              backDescription={descriptionBack}
              getHTML={(e) => setDescription(e)}
            />
          </div> */}
        {/* )} */}
        {/* {!isAboutBoardOpen && !isOpenArchives && <div>d</div>} */}
      </div>
    </>
  );
};

export default AdditionalMenu;
