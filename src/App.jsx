import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Login from './Login.jsx';

const App = () => (
  // <div style={ {color: 'white' } }>Welcome to Top 100 movies </div>
  <Router>
    <div style={{ color: 'white' }}>
      <nav>
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/movielist">Movies</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
