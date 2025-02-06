import { Component } from 'react';
import Card from './Card';
import { CardListProps } from '../interfaces';
import Nothing from './Nothing';
import style from './CardList.module.css';

class CardList extends Component<CardListProps> {
  render() {
    return this.props.results.length === 0 ? (
      <Nothing empty={this.props.empty} />
    ) : (
      <div className={style.cardList}>
        {this.props.results.map((item, index) => (
          <Card key={index} index={index + 1} comic={item} />
        ))}
      </div>
    );
  }
}

export default CardList;
