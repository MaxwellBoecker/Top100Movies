import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Profile from './Profile.jsx';
import Search from './Search.jsx';
import MovieList from './MovieList.jsx';
import LandingPage from './LandingPage.jsx';

const App = () => (
  // <div style={ {color: 'white' } }>Welcome to Top 100 movies </div>
  <Router>
    <div style={{ color: 'white' }}>
      <nav>
        <span style={{ paddingRight: '8px' }}>
          <Link to="/profile">Profile</Link>
        </span>
        <span style={{ paddingRight: '8px' }}>
          <Link to="/movielist">Movies</Link>
        </span>
        <span style={{ paddingRight: '8px' }}>
          <a href="/auth/google">Log In</a>
        </span>
        <span style={{ paddingRight: '8px' }}>
          <a href="/auth/logout">Log Out</a>
        </span>
        <span style={{ paddingRight: '8px' }}>
          <Link to="/search">Search</Link>
        </span>
      </nav>
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
