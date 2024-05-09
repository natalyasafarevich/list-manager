export const CONTACTS = 'contacts/CONTACTS';

export type ContactsProp = {
  type: typeof CONTACTS;
  payload: {[key: string]: string};
};

export type ActionsType = ContactsProp;

export const getContacts = (data: {[key: string]: string}) => {
  return {
    type: CONTACTS,
    payload: data,
  };
};
