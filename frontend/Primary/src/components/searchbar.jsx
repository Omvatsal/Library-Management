import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleIconClick = () => {
    inputRef.current?.focus();
  };

  const handleSearch = async () => {
    if (query.length > 0) {
      const url = `/books?query=${query}`;
      navigate(url);  
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="relative max-w-md m-2">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for books here"
        onFocus={(e) => (e.target.placeholder = '')}
        onBlur={(e) => (e.target.placeholder = 'Search for books here')}
        className="bg-white text-gray-700 placeholder-gray-700 pl-6 pr-10 py-3 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full"
      />
      <Search
        size={20}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
        onClick={handleIconClick}
      />
    </div>
  );
}
