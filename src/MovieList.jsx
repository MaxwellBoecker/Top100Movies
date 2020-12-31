import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieListEntry from './MovieListEntry.jsx';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  useEffect(async () => {
    const resp = await axios.get('/usermovie');
    console.log(resp.data);
    setMovies(resp.data);
  }, []);

  return (
    <div>
      <div style={{ color: 'white' }}>
        {movies.map((m) => <MovieListEntry movieData={m} key={m.id} />)}
      </div>
    </div>
  );
};

export default MovieList;
