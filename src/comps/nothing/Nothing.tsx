import style from './Nothing.module.css';
import { NothingProps } from '../../interfaces';

const Nothing: React.FC<NothingProps> = ({ empty }) => {
  return (
    <div className={style.item}>
      <div className={style.stars}>
        <span className={style.star}>★</span>
        <span className={style.star}>★</span>
        <span className={style.star}>★</span>
      </div>
      {!empty && (
        <>
          Sorry, nothing found. Try another query like "star", "war" or something else...
          <div className={style.stars}>
            <span className={style.star}>★</span>
            <span className={style.star}>★</span>
            <span className={style.star}>★</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Nothing;
