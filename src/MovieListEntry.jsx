/* eslint-disable react/button-has-type */
import React from 'react';

const MovieListEntry = (props) => {
  const path = 'https://image.tmdb.org/t/p/original';
  const { movieData, deleteUserMovie } = props;
  const {
    title, poster_path, overview, backdrop_path, original_language, id,
  } = movieData;
  return (
    <div style={{ color: 'white' }}>
      <div>{title}</div>
      <img alt="movie poster" src={poster_path !== null ? path + poster_path : ''} style={{ width: '15%', height: '15%' }} />
      <div>{overview}</div>
      <div>
        original language:
        {original_language}
      </div>
      <button onClick={() => deleteUserMovie(id)}>
        Remove from favorites
      </button>
    </div>
  );
};

export default MovieListEntry;
