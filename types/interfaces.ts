export interface UserProps {
  email: string;
  uid: string;
}
export interface ColumnCardsProps {
  title: string;
  id: string;
  description?: string;
  comments:Array<string>
}
export interface CurrentColumnProps {
  name?: string;
  id?: string;
  cards: Array<ColumnCardsProps>;
}
