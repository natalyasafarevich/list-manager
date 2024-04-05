export const CURRENT_MEMBERS = 'members/CURRENT_MEMBERS';

export type MembersProp = {
  type: typeof CURRENT_MEMBERS;
  payload: any;
};

export type ActionsType = MembersProp;

export const getMembers = (data: any) => {
  return {
    type: CURRENT_MEMBERS,
    payload: data,
  };
};
