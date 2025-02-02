import { Component } from 'react';
import { AppState } from './interfaces';
import SearchBar from './comps/SearchBar';
import CardList from './comps/CardList';
import ErrorBoundary from './comps/ErrorBoundary';
import { getComics } from './utils/api';
import { callWithDelay } from './utils/delay';
import LoadingSpinner from './comps/LoadingSpinner';
import { ErrorButton } from './comps/ErrorButton';
import './styles.css';

class App extends Component<unknown, AppState> {
  state: AppState = {
    searchTerm: localStorage.getItem('searchTerm') || '',
    results: [],
    loading: false,
    error: null,
  };

  fetchResults = (query: string) => {
    this.setState({ loading: true, error: null });
    getComics(query)
      .then((data) => {
        callWithDelay(() => {
          this.setState({ results: data.comics, loading: false });
        });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  };

  handleSearch = (query: string) => {
    const trimmedQuery = query.trim();
    this.setState({ searchTerm: trimmedQuery });
    localStorage.setItem('searchTerm', trimmedQuery);
    this.fetchResults(trimmedQuery);
  };

  componentDidMount() {
    if (this.state.searchTerm) {
      this.fetchResults(this.state.searchTerm);
    }
  }

  render() {
    return (
      <div>
        <div className="header">Star★Comics</div>
        <ErrorBoundary>
          <div className="app">
            <SearchBar
              onSearch={this.handleSearch}
              initialValue={this.state.searchTerm}
            />
            {this.state.loading ? (
              <LoadingSpinner />
            ) : (
              <CardList
                results={this.state.results}
                empty={this.state.searchTerm.length === 0}
              />
            )}
            <ErrorButton />
          </div>
        </ErrorBoundary>
        <div className="footer"></div>
      </div>
    );
  }
}

export default App;
