// import {PayloadProdps} from './../column-setting/actions';
import {ColumnCardsProps} from '@/types/interfaces';
import {UserInfo} from 'firebase/auth'; // Используйте UserInfo, если это возможно

export const COLUMN = 'colunm-info/COLUMN';
export const CURRENT_COLUMN = 'column-info/CURRENT_COLUMN';

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

interface PayloadProps {
  cards: Array<ColumnCardsProps>;
  id?: string;
  name?: string;
}
export type DataCurrentColumnProp = {
  type: typeof CURRENT_COLUMN;
  payload: PayloadProps;
};

export type ActionsType = DataColumnProp | DataCurrentColumnProp;

export const getColumnInfo = (data: PayloadProps) => {
  return {
    type: COLUMN,
    payload: data,
  };
};

export const getCurrentColumn = (data: any) => {
  return {
    type: CURRENT_COLUMN,
    payload: data,
  };
};
