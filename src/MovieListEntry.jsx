import React from 'react';

const MovieListEntry = (props) => {
  const { movieData } = props;
  const {
    title, poster_path, overview, backdrop_path, original_language,
  } = movieData;
  return (
    <div style={{ color: 'white' }}>
      <div>{title}</div>
      <img alt="movie poster" src={poster_path} />
    </div>
  );
};

export default MovieListEntry;
