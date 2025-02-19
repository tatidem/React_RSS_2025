import React, { useEffect, useCallback } from 'react';
import {
  useSearchParams,
  useNavigate,
  Outlet,
  useParams,
  useLocation,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { setSearchTerm } from '../app/searchSlice';
import SearchBar from '../comps/SearchBar';
import CardList from '../comps/CardList';
import { ErrorButton } from '../comps/ErrorButton';
import LoadingSpinner from '../comps/LoadingSpinner';
import Pagination from '../comps/Pagination';
import { useSearchComicsQuery } from '../app/apiSlice';
import './home.css';

const ITEMS_PER_PAGE = 10;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { uid } = useParams<{ uid?: string }>();
  const location = useLocation();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);


  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

  useEffect(() => {
    const initialQuery = searchParams.get('query') || '';
    if (initialQuery !== searchTerm) {
      dispatch(setSearchTerm(initialQuery));
    }
  }, [dispatch, searchParams, searchTerm]);

  const { data, isLoading, isError, error } = useSearchComicsQuery(searchTerm, {
    // skip: !searchTerm.trim(),
  });

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim();
    dispatch(setSearchTerm(trimmedQuery));
    setSearchParams({ query: trimmedQuery, page: '1' });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ query: searchTerm, page: page.toString() });
  };

  const handleCardClick = useCallback(
    (cardUid: string) => {
      if (location.pathname === '/') {
        navigate(`/detailed/${cardUid}${location.search}`);
      }
    },
    [location.pathname, location.search, navigate]
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentResults = data?.comics?.slice(startIndex, endIndex) || [];

  return (
    <div>
      <div className="header">Star★Comics</div>
      <div className="app">
        <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <div className="error-message">{error?.toString()}</div>
        ) : (
          <div className="content">
            <div className="left-section">
              <CardList
                results={currentResults}
                offset={startIndex}
                empty={searchTerm.length === 0}
                onCardClick={handleCardClick}
              />
              {data?.comics && data.comics.length > ITEMS_PER_PAGE && (
                <Pagination
                  currentPage={currentPage}
                  totalItems={data.comics.length}
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
        <div className="error-button-wrapper">
          <ErrorButton />
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default Home;