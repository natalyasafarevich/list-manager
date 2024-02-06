import {UserInfo} from 'firebase/auth'; // Используйте UserInfo, если это возможно

export const DATA_USER = 'data-user/DATA_USER';

export type DataUserProp = {
  type: typeof DATA_USER;
  payload: UserInfo;
};

export type ActionsType = DataUserProp;

export const getDataUser = (data: any) => {
  return {
    type: DATA_USER,
    payload: data,
  };
};
