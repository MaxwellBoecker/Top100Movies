import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieListEntry from './MovieListEntry.jsx';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  useEffect(async () => {
    const resp = await axios.get('/usermovie');
    setMovies(resp.data);
  }, []);

  const deleteUserMovie = async (id) => {
    const confirmation = await axios.delete('usermovie', { data: { id } });
    console.log(confirmation);
  };

  return (
    <div>
      <div style={{ color: 'white' }}>
        {movies.map((m) => <MovieListEntry movieData={m} key={m.id} deleteUserMovie={deleteUserMovie} />)}
      </div>
    </div>
  );
};

export default MovieList;
