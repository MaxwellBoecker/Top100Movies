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
          <span style={{ paddingRight: '8px' }}>
            <a href="/auth/google">Log In</a>
          </span>
          <span style={{ paddingRight: '8px' }}>
            <a href="/auth/logout">Log Out</a>
          </span>
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
