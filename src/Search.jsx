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

  const addFavoriteMovie = (options) => {
    console.log(options);
    axios.post('/usermovie', {
      data: options,
    })
      .then((resp) => console.log(resp.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="search" style={{ paddingTop: '64px' }}>
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
        {searchResults.map((r, i) => <SearchResult key={i} movieInfo={r} addFavoriteMovie={addFavoriteMovie} />)}
      </div>
    </div>
  );
};

export default Search;
