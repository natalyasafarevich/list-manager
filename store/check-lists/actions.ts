// import {ListTasksProps} from '@/components/CurrentBoard/Card/CardSettings/CreatedCheckList/AddItemForm/AddItemForm';
import {CheckListItemProps} from '@/types/interfaces';

export const CHECK_LISTS = 'check-lists/CHECK_LISTS';
export const IS_DELETE_LIST = 'check-lists/IS_DELETE_LIST';
export const CHECK_LIST_INDEX = 'check-lists/CHECK_LIST_INDEX';
export const CURRENT_TASKS = 'check-lists/CURRENT_TASKS';
export const IS_UPDATE_TASK = 'check-lists/IS_UPDATE_TASK';
export const DELETE_LIST = 'check-lists/DELETE_LIST';

export type ActionsType =
  | DataCheckListProps
  | ListIdProps
  | CurrentTasksProps
  | IsTaskUpdateProps
  | IsDeleteLisProps
  | DeleteLisProps;

export type DataCheckListProps = {
  type: typeof CHECK_LISTS;
  payload: Array<CheckListItemProps>;
};

export const getCheckLists = (data: Array<CheckListItemProps> | {}) => {
  return {
    type: CHECK_LISTS,
    payload: data,
  };
};

export type ListIdProps = {
  type: typeof CHECK_LIST_INDEX;
  payload: number;
};

export const getListIndex = (data: string) => {
  return {
    type: CHECK_LIST_INDEX,
    payload: data,
  };
};
export type CurrentTasksProps = {
  type: typeof CURRENT_TASKS;
  payload: {data: Array<any>; isCreate: boolean};
};

export const getCurrentTask = (data: Array<any>, isCreate: boolean) => {
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

export type IsDeleteLisProps = {
  type: typeof IS_DELETE_LIST;
  payload: boolean;
};
export const isDeleteList = (data: boolean) => {
  return {
    type: IS_DELETE_LIST,
    payload: data,
  };
};

export type DeleteLisProps = {
  type: typeof DELETE_LIST;
  payload: Array<any>;
};
export const deleteList = (data: Array<any>) => {
  return {
    type: DELETE_LIST,
    payload: data,
  };
};
