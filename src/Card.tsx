import { Component } from "react";
import { CardProps } from "./interfaces";

class Card extends Component<CardProps> {
  render() {
    return (
      <div className="card">
        <h3>{this.props.name}</h3>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default Card;