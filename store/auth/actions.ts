export const GOOGLE_PROVIDER = 'auth/GOOGLE_PROVIDER';

export type GoogleProviderProps = {
  type: typeof GOOGLE_PROVIDER;
  payload: any;
};
export type ActionsType = GoogleProviderProps;

export const isSingInWithGoogle = (data: boolean) => {
  return {
    type: GOOGLE_PROVIDER,
    payload: data,
  };
};
