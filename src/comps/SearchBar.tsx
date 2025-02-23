import { useEffect, useState } from 'react';
import { SearchBarProps } from '../interfaces';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue }) => {
  const [query, setQuery] = useState(initialValue || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    setQuery(initialValue || '');
  }, [initialValue]);

  const handleSubmit = () => {
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <input type="text" value={query} onChange={handleChange} />
      <button onClick={handleSubmit}>Search</button>
    </div>
  );
};

export default SearchBar;
