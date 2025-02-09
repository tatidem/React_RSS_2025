import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Outlet, useParams, useLocation } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import SearchBar from '../comps/SearchBar';
import { Comic } from '../interfaces';
import CardList from '../comps/CardList';
import { ErrorButton } from '../comps/ErrorButton';
import { getComics } from '../utils/api';
import { callWithDelay } from '../utils/delay';
import LoadingSpinner from '../comps/LoadingSpinner';
import Pagination from '../comps/Pagination';

import './home.css';

const ITEMS_PER_PAGE = 10;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [results, setResults] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { uid } = useParams<{ uid?: string }>();
  const location = useLocation();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  //const detailedId = searchParams.get('detailed');

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

  const handleCardClick = (uid: string) => {
    navigate(`/detailed/${uid}${location.search}`);
  };

  // const handleCloseDetailed = () => {
  //   setSearchParams({ page: currentPage.toString() });
  // };

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
          <div className="content">
            <div className="left-section">
              <CardList
                results={currentResults}
                offset={startIndex}
                empty={searchTerm.length === 0}
                onCardClick={handleCardClick}
              />
              {results.length > ITEMS_PER_PAGE && (
                <Pagination
                  currentPage={currentPage}
                  totalItems={results.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={handlePageChange}
                />
              )}
            </div>

            {uid && (
              <div className="right-section">
                <Outlet />
              </div>
            )}
            
          </div>
        )}
        {error && <div className="error-message">{error}</div>}
        <div className="error-button-wrapper">
          <ErrorButton />
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default Home;