import {UserInfo} from 'firebase/auth'; // Используйте UserInfo, если это возможно

export const BOARDS = 'board/BOARDS';
export type PayloadProps = {
  currentBg: string;
  id: string;
  name: string;
  visibility: string;
};
export type DataBoardProp = {
  type: typeof BOARDS;
  payload: Array<PayloadProps>;
};

export type ActionsType = DataBoardProp;

export const getBoards = (data: any) => {
  return {
    type: BOARDS,
    payload: data,
  };
};
