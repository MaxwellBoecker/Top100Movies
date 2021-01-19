import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { AppBar, Button, Toolbar } from '@material-ui/core';

import Profile from './Profile.jsx';
import Search from './Search.jsx';
import MovieList from './MovieList.jsx';
import LandingPage from './LandingPage.jsx';
import NewMovieListEntry from './newMovieListEntry.jsx';

const App = () => (
  <Router>
    <div style={{ color: 'white' }}>
      <AppBar>
        <Toolbar>
          <Link to="/profile">
            <Button>
              Profile
            </Button>
          </Link>
          <Link to="/movielist">
            <Button>
              My Top Movies
            </Button>
          </Link>
          <Link to="/auth/google">
            <Button>
              Log In
            </Button>
          </Link>
          <Link to="/auth/logout">
            <Button>
              Log Out
            </Button>
          </Link>
          <Link to="/search">
            <Button>
              Search
            </Button>
          </Link>

        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/movielist">
          <MovieList />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
