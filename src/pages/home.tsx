import React, { useEffect, useCallback, useState, useRef } from 'react';
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
import { addItem, removeItem } from '../app/selectedItemsSlice';
import SearchBar from '../comps/SearchBar';
import CardList from '../comps/CardList';
import { ErrorButton } from '../comps/ErrorButton';
import LoadingSpinner from '../comps/LoadingSpinner';
import Pagination from '../comps/Pagination';
import Flyout from '../comps/Flyout';
import { useSearchComicsQuery } from '../app/apiSlice';
import './home.css';
import { downloadCSV } from '../utils/downloadCSV';

const ITEMS_PER_PAGE = 10;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { uid } = useParams<{ uid?: string }>();
  const location = useLocation();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );
  const { data, isLoading, isError, error } = useSearchComicsQuery(searchTerm);

  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const [selectReset, setSelectReset] = useState<boolean>(false);

  useEffect(() => {
    const initialQuery = searchParams.get('query') || '';
    if (initialQuery !== searchTerm) {
      setSelectReset(false);
      dispatch(setSearchTerm(initialQuery));
    }
  }, [dispatch, searchParams, searchTerm]);

  const handleSearch = useCallback(
    (query: string) => {
      if (query === searchTerm) return;
      const trimmedQuery = query.trim();
      dispatch(setSearchTerm(trimmedQuery));
      setSelectReset(true);
      setSearchParams({ query: trimmedQuery, page: '1' });
    },
    [dispatch, setSearchParams, searchTerm]
  );

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

  const handleCheckboxChange = useCallback(
    (uid: string, isChecked: boolean) => {
      dispatch(isChecked ? addItem(uid) : removeItem(uid));
    },
    [dispatch]
  );

  const handleDownload = () => {
    downloadCSV(data, selectedItems, setDownloadUrl);
  };

  useEffect(() => {
    if (downloadUrl && linkRef.current) {
      linkRef.current.click();
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }
  }, [downloadUrl]);

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
                selectedItems={selectedItems}
                onCheckboxChange={handleCheckboxChange}
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
        {selectedItems.length > 0 && (
          <Flyout
            selectedCount={selectedItems.length}
            onDownload={handleDownload}
            reset={selectReset}
          />
        )}
        {downloadUrl && (
          <a
            href={downloadUrl}
            download={`${selectedItems.length}_episodes.csv`}
            style={{ display: 'none' }}
            ref={linkRef}
          >
            Download
          </a>
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
