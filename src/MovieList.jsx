import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieListEntry from './MovieListEntry.jsx';
import NewMovieListEntry from './NewMovieListEntry.jsx';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  useEffect(async () => {
    const resp = await axios.get('/usermovie');
    setMovies(resp.data);
  }, []);

  const deleteUserMovie = async (id) => {
    await axios.delete('usermovie', { data: { id } });
    const newMovies = movies.filter((m) => m.id !== id);
    setMovies(newMovies);
  };

  return (
    <div>
      <div style={{ color: 'white' }}>
        {movies.map((m, i) => <NewMovieListEntry movieData={m} number={i + 1} key={m.id} deleteUserMovie={deleteUserMovie} />)}
      </div>
    </div>
  );
};

export default MovieList;
