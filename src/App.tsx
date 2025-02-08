import React, { useEffect, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Comic } from './interfaces';
// import { AppState } from './interfaces';
import SearchBar from './comps/SearchBar';
import CardList from './comps/CardList';
import { getComics } from './utils/api';
import { callWithDelay } from './utils/delay';
import LoadingSpinner from './comps/LoadingSpinner';
import { ErrorButton } from './comps/ErrorButton';
import './styles.css';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [results, setResults] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getComics(query);
      callWithDelay(() => {
        setResults(data.comics);
        setLoading(false);
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim();
    setSearchTerm(trimmedQuery);
    fetchResults(trimmedQuery);
  };

  useEffect(() => {
    fetchResults(searchTerm);
  }, [searchTerm]);

  return (
    <div>
      <div className="header">Star★Comics</div>
      <div className="app">
        <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <CardList results={results} empty={searchTerm.length === 0} />
        )}
        {error && <div className="error-message">{error}</div>}
        <ErrorButton />
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default App;
