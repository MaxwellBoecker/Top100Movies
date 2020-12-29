/* eslint-disable react/button-has-type */
import React from 'react';

const SearchResult = (props) => {
  const { movieInfo, addFavoriteMovie } = props;
  const {
    title, original_language, overview, release_date, poster_path, backdrop_path, id,
  } = movieInfo;

  return (
    <div className="search-result" style={{ color: 'white' }}>
      <div style={{ color: 'purple' }}>{title}</div>
      <div style={{ color: 'red' }}>{original_language}</div>
      <div style={{ color: 'goldenrod' }}>{release_date}</div>
      <p>{overview}</p>
      <button onClick={() => addFavoriteMovie({
        title,
        original_language,
        overview,
        release_date,
        poster_path,
        backdrop_path,
        id,
      })}
      >
        Add as a Favorite!
      </button>
    </div>
  );
};

export default SearchResult;
