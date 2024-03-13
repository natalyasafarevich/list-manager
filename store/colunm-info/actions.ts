import {UserInfo} from 'firebase/auth'; // Используйте UserInfo, если это возможно

export const COLUMN = 'colunm-info/COLUMN';
// export type PayloadProps = {
//   currentBg: string;
//   id: string;
//   name: string;
//   visibility: string;
// };
export type DataColumnProp = {
  type: typeof COLUMN;
  payload: any;
};

export type ActionsType = DataColumnProp;

export const getColumnInfo = (data: any) => {
  return {
    type: COLUMN,
    payload: data,
  };
};
