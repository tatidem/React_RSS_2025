import { getDescription } from '../../core/utils/description';
import { CardProps } from '../../interfaces';
import style from './Card.module.css';

const Card: React.FC<CardProps> = ({ index, comic, onClick, isSelected, onCheckboxChange }) => {
  return (
    <article className={style.card} onClick={onClick}>
      <div className={style.wrap}>
        <h3 className={style.index}>{index}</h3>
      </div>
      <h3 className={style.title}>{comic.title}</h3>
      <p className={style.description}>{getDescription(comic)}</p>
      <input
        type="checkbox"
        className={style.checkbox}
        checked={isSelected}
        onChange={onCheckboxChange}
        onClick={(e) => e.stopPropagation()}
      />
    </article>
  );
};

export default Card;
