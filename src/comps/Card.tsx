import { Component } from 'react';
import { CardProps } from '../interfaces';
import { getDescription } from '../utils/description';
import style from './Card.module.css';

class Card extends Component<CardProps> {
  render() {
    return (
      <article className={style.card}>
        <div className={style.wrap}>
          <h3 className={style.index}>{this.props.index}</h3>
        </div>
        <h3 className={style.title}>{this.props.comic.title}</h3>
        <p className={style.description}>{getDescription(this.props.comic)}</p>
      </article>
    );
  }
}

export default Card;
