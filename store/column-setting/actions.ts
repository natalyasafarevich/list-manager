export const IS_COLUMN_SETTING_OPEN = 'column-setting/IS_COLUMN_SETTING_OPEN';
export const IS_CREATE_CARD = 'column-setting/IS_COLUMN_OPEN';
export const IS_COPY_COLUMN = 'column-setting/IS_COPY_COLUMN';
export const IS_ARCHIVE_COLUMN = 'column-setting/IS_ARCHIVE_COLUMN';

export type PayloadProps = {
  isOpen: boolean;
};

export type DataColumnProps = {
  type: typeof IS_COLUMN_SETTING_OPEN;
  payload: PayloadProps;
};

export type ActionsType =
  | DataColumnProps
  | DataCreateCardProps
  | DataIsCopyColumnProps
  | DataIsArchiveColumnProps;

export const getIsOpenClSetting = (data: PayloadProps) => {
  return {
    type: IS_COLUMN_SETTING_OPEN,
    payload: data,
  };
};

export type CreateCardProps = {
  isCreate: boolean;
};
export type DataCreateCardProps = {
  type: typeof IS_CREATE_CARD;
  payload: CreateCardProps;
};
// export type CreateCardProps = {
//   isCreate: boolean;
// };
export const isCreateCard = (data: CreateCardProps) => {
  return {
    type: IS_CREATE_CARD,
    payload: data,
  };
};
export type CopyColumnProps = {
  isCopy: boolean;
};
export type DataIsCopyColumnProps = {
  type: typeof IS_COPY_COLUMN;
  payload: CopyColumnProps;
};
export const isCopyColumn = (data: CopyColumnProps) => {
  return {
    type: IS_COPY_COLUMN,
    payload: data,
  };
};

export type IsArchiveColumnProps = {
  isArchive: boolean;
};
export type DataIsArchiveColumnProps = {
  type: typeof IS_ARCHIVE_COLUMN;
  payload: IsArchiveColumnProps;
};
export const isArchive = (data: IsArchiveColumnProps) => {
  return {
    type: IS_ARCHIVE_COLUMN,
    payload: data,
  };
};
