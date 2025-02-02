import { Component } from "react";
import Card from "./Card";
import { CardListProps } from "./interfaces";

class CardList extends Component<CardListProps> {
  render() {
    return (
      <div className="card-list">
        {this.props.results.map((item, index) => (
          <Card key={index} name={item.name} description="A Pokémon" />
        ))}
      </div>
    );
  }
}

export default CardList;