import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Comic } from './interfaces';
import SearchBar from './comps/SearchBar';
import CardList from './comps/CardList';
import { getComics } from './utils/api';
import { callWithDelay } from './utils/delay';
import LoadingSpinner from './comps/LoadingSpinner';
import { ErrorButton } from './comps/ErrorButton';
import Pagination from './comps/Pagination';
import './styles.css';

const ITEMS_PER_PAGE = 10;

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [results, setResults] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);

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
    setSearchParams({ page: '1' });
    fetchResults(trimmedQuery);
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  useEffect(() => {
    fetchResults(searchTerm);
  }, [searchTerm]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentResults = results.slice(startIndex, endIndex);

  return (
    <div>
      <div className="header">Star★Comics</div>
      <div className="app">
        <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <CardList results={currentResults} empty={searchTerm.length === 0} />
            {results.length > ITEMS_PER_PAGE && (
              <Pagination
                currentPage={currentPage}
                totalItems={results.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
        {error && <div className="error-message">{error}</div>}
        <ErrorButton />
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default App;
