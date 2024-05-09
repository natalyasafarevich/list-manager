export const MARKERS = 'card-sidebar/MARKERS';
export const IS_ARCHIVED = 'card-sidebar/IS_ARCHIVED';

export type PayloadProps = {
  id: string;
  color: string;
};
// export type MarkerProps = {
//   id: string;
//   color: string;
// };

export type DataMarkersProps = {
  type: typeof MARKERS;
  payload: any;
};

export type ActionsType = DataMarkersProps | IsArchivedCardProps;

export const getMarkersCurrent = (data: any) => {
  return {
    type: MARKERS,
    payload: data,
  };
};

export type IsArchivedCardProps = {
  type: typeof IS_ARCHIVED;
  payload: boolean;
};
export const isArchivedCard = (data: boolean) => {
  return {
    type: IS_ARCHIVED,
    payload: data,
  };
};
