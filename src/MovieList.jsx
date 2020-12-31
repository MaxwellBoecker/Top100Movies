import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  useEffect(async () => {
    const data = await axios.get('/usermovie');
    console.log(data);
  }, []);

  return (
    <div>
      <div style={{ color: 'white' }}>
        movie list
      </div>
    </div>
  );
};

export default MovieList;
