'use client';
import {FC, useEffect, useState} from 'react';
import CardSettings from '../CardSettings/CardSettings';
import {AppDispatch, RootState} from '@/store/store';
import {useDispatch, useSelector} from 'react-redux';
import {getColumnInfo} from '@/store/colunm-info/actions';
import {ColumnCardsProps} from '@/types/interfaces';
import {getMarkersCurrent, isArchivedCard} from '@/store/card-sidebar/actions';
import './CardDisplay.scss';

export type CardDisplayProps = {
  card: ColumnCardsProps;
  item: any;
};

const CardDisplay: FC<CardDisplayProps> = ({card, item}) => {
  const [isOpenCard, setIsOpenCards] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getColumnInfo({
        id: item?.id,
        cards: item?.cards,
      }),
    );
  }, [isOpenCard]);

  const openCard = () => {
    dispatch(getMarkersCurrent({}));
    setIsOpenCards(!isOpenCard);
    dispatch(isArchivedCard(card?.isArchived || false));
  };
  const {markers} = card;
  return (
    <div className='card-display'>
      <div className='card-display__container'>
        {!card?.isArchived && (
          <div
            style={{background: card?.cover}}
            onClick={openCard}
            className='card-display__box'
            data-cover={card.cover}
          >
            <span className='card-display__title'> {card.title}</span>
            {card?.description && (
              <div className='card-display__desc' dangerouslySetInnerHTML={{__html: card.description}}></div>
            )}

            {markers && (
              <div className='card-display__row'>
                {Object.keys(markers)?.map(
                  (item: any, i) =>
                    i < 5 && (
                      <div
                        key={i}
                        className='card-display__markers'
                        style={{
                          background: markers[item].color,
                        }}
                      >
                        {markers[item]?.text}
                      </div>
                    ),
                )}{' '}
              </div>
            )}

            {(card['check-lists'] || card.comments) && (
              <div className='card-display__row'>
                {card['check-lists'] && (
                  <span className='card-display__icon card-display__icon_check'>
                    {Object.keys(card['check-lists']).length}
                  </span>
                )}
                {card.comments && (
                  <span className='card-display__icon card-display__icon_comments'>{card.comments.length}</span>
                )}
              </div>
            )}
          </div>
        )}

        {isOpenCard && (
          <CardSettings
            setIsOpenCard={(e) => {
              setIsOpenCards(e);
            }}
            card={card}
          />
        )}
      </div>
    </div>
  );
};

export default CardDisplay;
