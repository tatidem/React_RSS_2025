import React from 'react';
import { CardListProps } from '../interfaces';
import Card from './Card';
import Nothing from './Nothing';
import style from './CardList.module.css';

const CardList: React.FC<CardListProps> = ({
  results,
  empty,
  offset,
  onCardClick,
  selectedItems,
  onCheckboxChange,
}) => {
  if (results.length === 0) {
    return <Nothing empty={empty} />;
  }

  return (
    <div className={style.cardList}>
      {results.map((item, index) => (
        <Card
          key={item.uid}
          index={offset + index + 1}
          comic={item}
          onClick={() => onCardClick(item.uid)}
          isSelected={selectedItems.includes(item.uid)}
          onCheckboxChange={(e) => onCheckboxChange(item.uid, e.target.checked)}
        />
      ))}
    </div>
  );
};

export default CardList;
