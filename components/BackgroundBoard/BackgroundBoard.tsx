import {FC, useState} from 'react';
import './BackgroundBoard.scss';

interface BackgroundBoardProps {
  handleClick: (e: any) => void;
  card: Array<{url: string}>;
}
const BackgroundBoard: FC<BackgroundBoardProps> = ({card, handleClick}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const handleButtonClick = (url: string, index: number) => {
    handleClick(url);
    setActiveIndex(index);
  };
  return (
    <div className='board-image'>
      <div className='board-image__row flex'>
        {card.map((item, i) => (
          <button
            key={i}
            className={`board-image__image ${activeIndex === i ? 'active' : ''}`}
            data-url={item.url}
            type='button'
            onClick={() => handleButtonClick(item.url, i)}
            style={{
              background: `center/cover no-repeat url(${item.url + `&w=400`})`,
            }}
          ></button>
        ))}
      </div>
    </div>
  );
};
export default BackgroundBoard;
