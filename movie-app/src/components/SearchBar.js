import React, { useState } from 'react';
import { SearchBarWrapper, Input, Button } from './SearchBar.styles';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <SearchBarWrapper>
      <Input 
        type="text" 
        placeholder="Search for a movie..." 
        value={query} 
        onChange={handleInputChange} 
      />
      <Button onClick={handleSearch}>Search</Button>
    </SearchBarWrapper>
  );
};

export default SearchBar;