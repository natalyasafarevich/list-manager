'use client';
import {FC, useEffect, useState} from 'react';
import 'firebase/auth';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import AddMember from './AddMember/AddMember';
import {fetchBackData} from '@/helper/getFirebaseData';
import {MemberProps} from '@/types/interfaces';

const Members: FC = () => {
  const [user, setUser] = useState<any>();
  const [userData, setUsersData] = useState<Array<any>>([]);
  // console.log(userData, 'userDatauserData');
  // useEffect(() => {
  //   if (user) {
  //     setUsersData((prev: any) => [
  //       ...prev,
  //       {name: user.public_name, email: user.email, photo: user.mainPhoto},
  //     ]);
  //   }
  // }, [user]);
  // console.log(user);
  const boardIndex = useSelector((state: RootState) => state.boards.index);

  const board = useSelector((state: RootState) => state.boards.currentBoards);

  return (
    <div className='text-light'>
      <h1>Поиск пользователя по email</h1>
      <div>
        {/* участники: */}
        {/* {board?.members?.map((item, i) => {
          return (
            <p key={i}>
              {item.role} -{item.email}{' '}
            </p>
          );
        })} */}
      </div>
      <AddMember />
    </div>
  );
};

export default Members;
