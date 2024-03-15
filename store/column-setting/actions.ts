export const IS_COLUMN_SETTING_OPEN = 'column-setting/IS_COLUMN_OPEN';

export type PayloadProps = {
  isOpen: boolean;
};
export type DataColumnProps = {
  type: typeof IS_COLUMN_SETTING_OPEN;
  payload: PayloadProps;
};

export type ActionsType = DataColumnProps;

export const getIsOpenClSetting = (data: PayloadProps) => {
  return {
    type: IS_COLUMN_SETTING_OPEN,
    payload: data,
  };
};
