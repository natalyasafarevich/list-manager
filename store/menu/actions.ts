// actions.js
export const TOGGLE_MENU = 'TOGGLE_MENU';

export const toggleMenu = (value: boolean) => ({
  type: TOGGLE_MENU,
  payload: value,
});

export type MenuProp = {
  type: typeof TOGGLE_MENU;
  payload: boolean;
};

export type ActionsType = MenuProp;
