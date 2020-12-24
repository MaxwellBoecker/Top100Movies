import React from 'react';

const SearchResult = (props) => {
  const { movieInfo } = props;
  const {
    title, original_language, overview, release_date,
  } = movieInfo;
  return (
    <div className="search-result" style={{ color: 'white' }}>
      <div>{title}</div>
      <div>{original_language}</div>
      <div>{release_date}</div>
      <p>{overview}</p>
    </div>
  );
};

export default SearchResult;
