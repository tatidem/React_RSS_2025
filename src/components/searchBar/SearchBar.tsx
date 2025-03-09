import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SearchBarProps } from '../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '@/core/searchSlice';
import { RootState } from '@/core/store';
import { unselectAll } from '@/core/selectedItemsSlice';
import style from './SearchBar.module.css';

const SearchBar: React.FC<SearchBarProps> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const [query, setQuery] = useState(searchTerm || '');

  const handleSearch = useCallback(
    (query: string) => {
      if (query === searchTerm) return;
      const trimmedQuery = query.trim();
      dispatch(setSearchTerm(trimmedQuery));
      dispatch(unselectAll());
      router.push({
        pathname: router.pathname,
        query: { ...router.query, query: trimmedQuery, page: '1' },
      });
    },
    [dispatch, router, searchTerm]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const initialQuery = (router.query.query as string) || '';
    if (initialQuery !== searchTerm) {
      dispatch(setSearchTerm(initialQuery));
    }
    setQuery(searchTerm || '');
  }, [dispatch, router.query, searchTerm]);

  return (
    <div className={style['search-bar']}>
      <input type="text" value={query} onChange={handleChange} role="textbox" />
      <button onClick={() => handleSearch(query)}>Search</button>
    </div>
  );
};

export default SearchBar;
