import {isArchive} from './../store/column-setting/actions';
import {CommentProps} from './../components/CurrentBoard/Card/CardSettings/CardSettings';
export interface UserProps {
  email: string;
  uid: string;
}

interface CheckListProps {
  id: string;
  isHideCheckedList: boolean;
  title: string;
}
interface CommentsProps {
  createDate: string;
  editDate: string;
  id: string;
  name: string;
  owner: string;
  photoUrl: string;
  title: string;
}
export interface ColumnCardsProps {
  title: string;
  id: string;
  description?: string;
  comments: CommentsProps[];
  markers?: any;
  isArchived?: boolean;
  cover?: string;
  'check-lists'?: {[key: string]: CheckListProps};
}
export interface CurrentColumnProps {
  name?: string;
  id?: string;
  isArchive?: boolean;
  cards: Array<ColumnCardsProps>;
}
export interface CheckListItemProps {
  order: any;
  id: string;
  title: string;
  tasks?: any;
  isDelete?: boolean;
  isHideCheckedList?: boolean;
}

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

export interface BoardMembersProps {
  [key: string]: string;
}
export type BoardProps = {
  currentBg?: string;
  id?: string;
  members?: BoardMembersProps;
  creationDate?: string;
  owner?: string;
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
export interface CheckboxItemProps {
  id: string;
  isChecked: boolean;
  order: number;
  title: string;
}

export interface EditorState {
  prevValue: string;
  isSave: boolean;
  isOpen: boolean;
  currentTitle: string;
  editorHtml: string;
  commentsInfo: {
    id: string;
    index: number;
    editDate: string;
  };
}
