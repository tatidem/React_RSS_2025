import React, { Component } from 'react';
import { SearchBarProps, SearchBarState } from '../interfaces';

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  state: SearchBarState = { query: this.props.initialValue || '' };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = () => {
    this.props.onSearch(this.state.query);
  };

  render() {
    return (
      <div className="search-bar">
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Search</button>
      </div>
    );
  }
}

export default SearchBar;
