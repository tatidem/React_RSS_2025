import { Component } from 'react';

export class ErrorButton extends Component {
  state = {
    error: false,
  };

  onClick = () => this.setState({ error: true });

  render() {
    if (this.state.error) throw new Error('Something went wrong...');
    return (
      <button onClick={this.onClick} type="button">
        {'Error Button'}
      </button>
    );
  }
}
