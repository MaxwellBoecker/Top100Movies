import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Profile from './Profile.jsx';

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
      </nav>
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
