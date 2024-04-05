import {RootState} from '@/store/store';
import {ListsProps} from '@/types/interfaces';
import {useSelector} from 'react-redux';
interface currentListIndexProps {
  item: Array<any>;
}

export const currentListIndex = ({item}: currentListIndexProps) => {
  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoards.lists,
  );
  if (currentBoard) return currentBoard.indexOf(item);
};
