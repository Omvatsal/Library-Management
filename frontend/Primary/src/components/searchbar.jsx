import React, { useRef } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const inputRef = useRef(null);

  const handleIconClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="relative max-w-md m-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for books here"
        onFocus={(e) => (e.target.placeholder = '')}
        onBlur={(e) => (e.target.placeholder = 'Search for books here')}
        className="bg-white text-gray-700 placeholder-gray-700 pl-6 pr-10 py-3 border border-gray-300  text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      <Search
        size={20}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
        onClick={handleIconClick}
      />
    </div>
  );
}
