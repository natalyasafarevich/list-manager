export interface UserProps {
  email: string;
  uid: string;
}
export interface ColumnCardsProps {
  title: string;
  id: string;
  description?: string;
  comments: Array<string>;
  markers?: Array<string>;
}
export interface CurrentColumnProps {
  name?: string;
  id?: string;
  cards: Array<ColumnCardsProps>;
}
export type CheckListProps = {
  id: string;
  title: string;
  tasks?: Array<any>;
  isDelete?: boolean;
};
