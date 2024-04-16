import {BoardProps} from '@/types/interfaces';

export const BOARDS = 'board/BOARDS';
export const CURRENT_BOARDS = 'board/CURRENT_BOARDS';

export type PayloadProps = {
  isCloseBoard: any;
  lists: any;
  currentBg: string;
  id: string;
  name: string;
  type: string;
};
export type DataBoardProp = {
  type: typeof BOARDS;
  payload: Array<BoardProps>;
};
export type CurrentBoardProp = {
  type: typeof CURRENT_BOARDS;
  payload: any;
  index: number;
};

export type ActionsType = DataBoardProp | CurrentBoardProp;

export const getBoards = (data: any) => {
  return {
    type: BOARDS,
    payload: data,
  };
};

export const getBoardCurrent = (data: BoardProps, index: number) => {
  return {
    type: CURRENT_BOARDS,
    payload: data,
    index: index,
  };
};
