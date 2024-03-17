import {UserInfo} from 'firebase/auth';

export const DATA_USER = 'data-user/DATA_USER';
export const RESET_DATA_USER = 'data-user/RESET_DATA_USER';

export const DATA_USER_FOR_FIREBASE = 'data-user/DATA_USER_FOR_FIREBASE';

export type DataUserProp = {
  type: typeof DATA_USER;
  payload: UserInfo;
};
export type ResetDataUserProp = {
  type: typeof RESET_DATA_USER;
};
export type ActionsType =
  | DataUserProp
  | ResetDataUserProp
  | DataUserFirebaseProp;

export const getDataUser = (data: any) => {
  return {
    type: DATA_USER,
    payload: data,
  };
};

export const ResetDataUser = () => {
  return {
    type: RESET_DATA_USER,
  };
};

interface DataUserForFBProps {
  uid: string;
  boardIndex: number;
  cardIndex: number;
}

export type DataUserFirebaseProp = {
  type: typeof DATA_USER_FOR_FIREBASE;
  payload: DataUserForFBProps;
};

export const getDataUserForFB = (data: DataUserForFBProps) => {
  return {
    type: DATA_USER,
    payload: data,
  };
};
