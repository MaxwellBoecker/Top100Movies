/* eslint-disable react/button-has-type */
import React from 'react';

const SearchResult = (props) => {
  const { movieInfo, addFavoriteMovie } = props;
  const {
    title, original_language, overview, release_date, poster_path, backdrop_path, id,
  } = movieInfo;
  const path = 'https://image.tmdb.org/t/p/original';

  return (
    <div className="search-result" style={{ color: 'white' }}>
      <div style={{ color: 'purple' }}>{title}</div>
      <div style={{ color: 'red' }}>{original_language}</div>
      <div style={{ color: 'goldenrod' }}>{release_date}</div>
      <img alt="movie poster" src={poster_path !== null ? path + poster_path : ''} style={{ width: '15%', height: '15%' }} />
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
