import {FC} from 'react';
interface BackgroundBoardProps {
  handleClick: (e: any) => void;
  card: Array<{url: string}>;
}
const BackgroundCard: FC<BackgroundBoardProps> = ({card, handleClick}) => {
  return (
    <>
      {card.map((item, i) => (
        <button
          key={i}
          data-url={item.url}
          type='button'
          onClick={handleClick}
          style={{
            width: '100px',
            height: '100px',
            background: `center/cover no-repeat url(${item.url})`,
          }}
        ></button>
      ))}
    </>
  );
};
export default BackgroundCard;
