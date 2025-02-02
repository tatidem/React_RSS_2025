import { Component } from "react";
import { AppState } from "./interfaces";
import SearchBar from "./SearchBar";
import CardList from "./CardList";
import ErrorBoundary from "./ErrorBoundary";
import "./styles.css";

class App extends Component<{}, AppState> {
  state: AppState = {
    searchTerm: localStorage.getItem("searchTerm") || "",
    results: [],
    loading: false,
    error: null,
  };

  fetchResults = (query: string) => {
    this.setState({ loading: true, error: null });
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ results: data.results, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  };

  handleSearch = (query: string) => {
    const trimmedQuery = query.trim();
    this.setState({ searchTerm: trimmedQuery });
    localStorage.setItem("searchTerm", trimmedQuery);
    this.fetchResults(trimmedQuery);
  };

  componentDidMount() {
    if (this.state.searchTerm) {
      this.fetchResults(this.state.searchTerm);
    }
  }

  render() {
    return (
      <ErrorBoundary>
        <div className="app">
          <SearchBar onSearch={this.handleSearch} initialValue={this.state.searchTerm} />
          {this.state.loading && <p>Loading...</p>}
          {this.state.error && <p className="error">{this.state.error}</p>}
          <CardList results={this.state.results} />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;