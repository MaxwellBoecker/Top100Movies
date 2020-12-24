import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchResult from './SearchResult.jsx';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get('/movies', {
      params: {
        title: searchTerm,
      },
    })
      .then((resp) => {
        console.log(resp.data);
        setSearchResults(resp.data.results);
      })
      .catch((err) => console.log(err));
    setSearchTerm('');
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>
        {searchResults.map((r, i) => <SearchResult key={i} movieInfo={r} />)}
      </div>
    </div>
  );
};

export default Search;
