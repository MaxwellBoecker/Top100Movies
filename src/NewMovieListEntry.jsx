import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';

const NewMovieListEntry = (props) => {
  const path = 'https://image.tmdb.org/t/p/original';
  const { movieData, deleteUserMovie, number } = props;
  const {
    title, poster_path, overview, backdrop_path, original_language, id,
  } = movieData;
  console.log(number)
  return (
    <Grid container spacing={2} style={{ paddingTop: '64px', color: 'white'}}>
      <Grid item zeroMinWidth xs={1}>
        <Typography variant="h1">
          {number}
        </Typography>
      </Grid>
      <Grid item md={3}>
        <img alt="movie poster" src={poster_path !== null ? path + poster_path : ''} style={{ width: '100%', height: '100%' }} />
      </Grid>
      <Grid item md={3}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="paragraph">{overview}</Typography>
          <Typography style={{ paddingTop: '12px', paddingBottom: '12px' }}>
            Original Language:
            {' '}
            {original_language}
          </Typography>
          <Button onClick={() => deleteUserMovie(id)} variant="contained" color="primary">
            Remove from favorites
          </Button>
      </Grid>
    </Grid>
  );
};

export default NewMovieListEntry;
