import {BasicUserInfo} from '@/components/ProfileCompletionForm/Step1Form/Step1Form';
import {InputsProps} from '@/components/ProfileCompletionForm/Step2Form/Step2Form';

export const GOOGLE_PROVIDER = 'auth/GOOGLE_PROVIDER';
export const BASIC_USER_INFO = 'auth/BASIC_USER_INFO';
export const ADDITIONAL_USER_INFO = 'auth/ADDITIONAL_USER_INFO';
export const USERS_NICKNAMES = 'auth/USERS_NICKNAMES';

export type ActionsType =
  | GoogleProviderProps
  | BasicUserDataProps
  | AdditionalUserDataProps
  | UserNamesProps;

type UserNamesProps = {
  type: typeof USERS_NICKNAMES;
  payload: string[];
};

export const getUserNames = (data: string[]) => {
  return {
    type: USERS_NICKNAMES,
    payload: data,
  };
};
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
  payload: InputsProps;
};

export const getAdditionalUserData = (data: InputsProps) => {
  return {
    type: ADDITIONAL_USER_INFO,
    payload: data,
  };
};
