export const IS_CARD_SETTING_OPEN = 'card-setting/IS_CARD_SETTING_OPEN';

export type PayloadProps = {
  isOpen: boolean;
};

export type DataCardProps = {
  type: typeof IS_CARD_SETTING_OPEN;
  payload: PayloadProps;
};

export type ActionsType = DataCardProps;

export const getIsOpenCardSetting = (data: PayloadProps) => {
  return {
    type: IS_CARD_SETTING_OPEN,
    payload: data,
  };
};
