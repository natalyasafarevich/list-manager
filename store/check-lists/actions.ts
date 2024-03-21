import {CheckListProps} from '@/types/interfaces';

export const CHECK_LISTS = 'check-lists/CHECK_LISTS';

export type DataCheckListProps = {
  type: typeof CHECK_LISTS;
  payload: Array<CheckListProps>;
};

export type ActionsType = DataCheckListProps;

export const getCheckLists = (data: Array<CheckListProps>) => {
  return {
    type: CHECK_LISTS,
    payload: data,
  };
};
