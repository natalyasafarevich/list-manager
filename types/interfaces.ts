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
  isArchived?: boolean;
  cover?: string;
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
  isHideCheckedList?: boolean;
};

export interface BackgroundImageBoard {
  urls: {
    full: string;
    raw: string;
    small: string;
    small_s3: string;
    thumb: string;
  };
  user: {link: string; name: string};
}
