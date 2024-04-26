import {BasicUserInfo} from '@/components/ProfileCompletionForm/Step1Form/Step1Form';

export const GOOGLE_PROVIDER = 'auth/GOOGLE_PROVIDER';
export const BASIC_USER_INFO = 'auth/BASIC_USER_INFO';
export const ADDITIONAL_USER_INFO = 'auth/ADDITIONAL_USER_INFO';

export type ActionsType =
  | GoogleProviderProps
  | BasicUserDataProps
  | AdditionalUserDataProps;

type GoogleProviderProps = {
  type: typeof GOOGLE_PROVIDER;
  payload: any;
};

export const isSingInWithGoogle = (data: boolean) => {
  return {
    type: GOOGLE_PROVIDER,
    payload: data,
  };
};

type BasicUserDataProps = {
  type: typeof BASIC_USER_INFO;
  payload: BasicUserInfo;
};

export const getBasicUserData = (data: BasicUserInfo) => {
  return {
    type: BASIC_USER_INFO,
    payload: data,
  };
};

type AdditionalUserDataProps = {
  type: typeof ADDITIONAL_USER_INFO;
  payload: any;
};

export const getAdditionalUserData = (data: any) => {
  return {
    type: ADDITIONAL_USER_INFO,
    payload: data,
  };
};
