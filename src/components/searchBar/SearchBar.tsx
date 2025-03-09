'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchBarProps } from '../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '@/core/searchSlice';
import { RootState } from '@/core/store';
import { unselectAll } from '@/core/selectedItemsSlice';
import style from './SearchBar.module.css';

const SearchBar: React.FC<SearchBarProps> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const [query, setQuery] = useState(searchTerm || '');

  const handleSearch = useCallback(
    (query: string) => {
      if (query === searchTerm) return;
      const trimmedQuery = query.trim();
      dispatch(setSearchTerm(trimmedQuery));
      dispatch(unselectAll());

      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('query', trimmedQuery);
      newSearchParams.set('page', '1');

      router.push(`?${newSearchParams.toString()}`);
    },
    [dispatch, router, searchTerm, searchParams]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const initialQuery = searchParams.get('query') || '';
    if (initialQuery !== searchTerm) {
      dispatch(setSearchTerm(initialQuery));
    }
    setQuery(searchTerm || '');
  }, [dispatch, searchParams, searchTerm]);

  return (
    <div className={style['search-bar']}>
      <input type="text" value={query} onChange={handleChange} role="textbox" />
      <button onClick={() => handleSearch(query)}>Search</button>
    </div>
  );
};

export default SearchBar;
