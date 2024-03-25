import {ListTasksProps} from '@/components/CurrentBoard/Card/CardSettings/CreatedCheckList/AddItemForm/AddItemForm';
import {CheckListProps} from '@/types/interfaces';

export const CHECK_LISTS = 'check-lists/CHECK_LISTS';
export const CHECK_LIST_INDEX = 'check-lists/CHECK_LIST_INDEX';
export const CURRENT_TASKS = 'check-lists/CURRENT_TASKS';
export const IS_UPDATE_TASK = 'check-lists/IS_UPDATE_TASK';

export type ActionsType =
  | DataCheckListProps
  | ListIdProps
  | CurrentTasksProps
  | IsTaskUpdateProps;

export type DataCheckListProps = {
  type: typeof CHECK_LISTS;
  payload: Array<CheckListProps>;
};

export const getCheckLists = (data: Array<CheckListProps>) => {
  return {
    type: CHECK_LISTS,
    payload: data,
  };
};

export type ListIdProps = {
  type: typeof CHECK_LIST_INDEX;
  payload: number;
};

export const getListIndex = (data: number) => {
  return {
    type: CHECK_LIST_INDEX,
    payload: data,
  };
};
export type CurrentTasksProps = {
  type: typeof CURRENT_TASKS;
  payload: {data: Array<ListTasksProps>; isCreate: boolean};
};

export const getCurrentTask = (
  data: Array<ListTasksProps>,
  isCreate: boolean,
) => {
  return {
    type: CURRENT_TASKS,
    payload: {data, isCreate},
  };
};

export type IsTaskUpdateProps = {
  type: typeof IS_UPDATE_TASK;
  payload: boolean;
};

export const isTaskUpdate = (data: boolean) => {
  return {
    type: IS_UPDATE_TASK,
    payload: data,
  };
};