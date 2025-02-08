import { CardProps } from '../interfaces';
import { getDescription } from '../utils/description';
import style from './Card.module.css';

const Card: React.FC<CardProps> = ({ index, comic }) => {
  return (
    <article className={style.card}>
      <div className={style.wrap}>
        <h3 className={style.index}>{index}</h3>
      </div>
      <h3 className={style.title}>{comic.title}</h3>
      <p className={style.description}>{getDescription(comic)}</p>
    </article>
  );
};

export default Card;
