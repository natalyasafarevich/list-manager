export const MARKERS = 'card-sidebar/MARKERS';

export type PayloadProps = {
  id: string;
  color: string;
};

export type DataMarkersProps = {
  type: typeof MARKERS;
  payload: Array<string>;
};

export type ActionsType = DataMarkersProps;

export const getMarkersCurrent = (data: Array<string>) => {
  return {
    type: MARKERS,
    payload: data,
  };
};
