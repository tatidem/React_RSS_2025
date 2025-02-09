import Card from './Card';
import { CardListProps } from '../interfaces';
import Nothing from './Nothing';
import style from './CardList.module.css';

const CardList: React.FC<CardListProps> = ({
  results,
  empty,
  offset,
  onCardClick,
}) => {
  return results.length === 0 ? (
    <Nothing empty={empty} />
  ) : (
    <div className={style.cardList}>
      {results.map((item, index) => (
        <Card
          key={index}
          index={offset + index + 1}
          comic={item}
          onClick={() => onCardClick(item.uid)}
        />
      ))}
    </div>
  );
};

export default CardList;
