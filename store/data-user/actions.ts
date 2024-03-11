import {UserInfo} from 'firebase/auth'; // Используйте UserInfo, если это возможно

export const DATA_USER = 'data-user/DATA_USER';
export const RESET_DATA_USER = 'data-user/RESET_DATA_USER';

export type DataUserProp = {
  type: typeof DATA_USER;
  payload: UserInfo;
};
export type ResetDataUserProp = {
  type: typeof RESET_DATA_USER;
};
export type ActionsType = DataUserProp | ResetDataUserProp;

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
