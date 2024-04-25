import {UserInfo} from 'firebase/auth';

export const DATA_USER = 'data-user/DATA_USER';
export const RESET_DATA_USER = 'data-user/RESET_DATA_USER';
export const DATA_USER_FOR_FIREBASE = 'data-user/DATA_USER_FOR_FIREBASE';
export const DATA_USER_FROM_FIREBASE = 'data-user/DATA_USER_FROM_FIREBASE';

export const UPDATE_LINK = 'data-user/UPDATE_LINK';
export const UPDATE_PHOTO = 'data-user/UPDATE_PHOTO';
export const USER_STATUS = 'data-user/USER_STATUS';

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
  | DataUserFirebaseProp
  | UpdateLinkProp
  | UpdatePhotoProp
  | UserStatusProp
  | UserInfoProp;

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

interface ObjectProps {
  boardIndex: number;
  listIndex: number;
  cardIndex: number;
  uid: string;
}

export type UpdateLinkProp = {
  type: typeof UPDATE_LINK;
  payload: ObjectProps;
};

export const getUpdateLink = (data: ObjectProps) => {
  return {
    type: UPDATE_LINK,
    payload: data,
  };
};

export type UpdatePhotoProp = {
  type: typeof UPDATE_PHOTO;
  payload: string;
};

export const getUpdatePhoto = (data: string) => {
  return {
    type: UPDATE_PHOTO,
    payload: data,
  };
};
export type UserStatusProp = {
  type: typeof USER_STATUS;
  payload: string;
};

export const getUserStatus = (data: string) => {
  return {
    type: USER_STATUS,
    payload: data,
  };
};
//!!
interface UserInfoProps {}
export type UserInfoProp = {
  type: typeof DATA_USER_FROM_FIREBASE;
  payload: any;
};

export const getUserInfo = (data: any) => {
  return {
    type: DATA_USER_FROM_FIREBASE,
    payload: data,
  };
};
