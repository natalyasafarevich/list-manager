export const IS_COLUMN_SETTING_OPEN = 'column-setting/IS_COLUMN_SETTING_OPEN';
export const IS_CREATE_CARD = 'column-setting/IS_COLUMN_OPEN';

export type PayloadProps = {
  isOpen: boolean;
};

export type DataColumnProps = {
  type: typeof IS_COLUMN_SETTING_OPEN;
  payload: PayloadProps;
};

export type ActionsType = DataColumnProps | DataCreateCardProps;

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

export const isCreateCard = (data: CreateCardProps) => {
  return {
    type: IS_CREATE_CARD,
    payload: data,
  };
};
