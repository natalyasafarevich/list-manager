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
  urls: string;
  //  {
  //   full: string;
  //   raw: string;
  //   small: string;
  //   small_s3: string;
  //   thumb: string;
  // };
  user: {link: string; name: string};
}
export type ListsProps = {id: string; name: string; isArchive?: boolean};

export type MemberProps = {
  id?: string;
  role?: string;
  public_name?: string;
  email?: string;
  mainPhoto?: MainPhotoProps;
};
export type BoardProps = {
  currentBg?: string;
  id?: string;
  members?: any;
  //  Array<MemberProps>;
  name?: string;
  type?: string;
  lists?: Array<ListsProps>;
  description?: string;
  isFavorite?: boolean;
  'text-color'?: string;
  currentColor?: string;
  isCloseBoard?: boolean;
};
export interface MainPhotoProps {
  name: string;
  url: string;
}
export interface UserStructure {
  board?: Array<BoardProps>;
  email?: string;
  localTime?: string;
  location?: string;
  mainPhoto?: MainPhotoProps;
  organization?: string;
  public_name?: string;
}

// export interface MemberProps {

// }
// {name: user.public_name, email: user.email, photo: user.mainPhoto
