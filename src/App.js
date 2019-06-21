import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import api from './services/Api';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Search Github users
  const searchUsers = async text => {
    setLoading(true);

    const response = await api.get(`/search/users?q=${text}&client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUsers(response.data.items);
    setLoading(false);
  };

  // get a single Github user
  const getUser = async (username) => {
    setLoading(true);

    const response = await api.get(`/users/${username}?client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    
    setUser(response.data);
    setLoading(false);
  }

  // Get Users repos
  const getUserRepos = async (username) => {
    setLoading(true);

    const response = await api.get(`/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setRepos(response.data);
    setLoading(false);
  }

  // Clear all users from screen
  const clearUsers = () => {
    setUsers([]);
    setLoading(true);
  }

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  }

    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search searchUsers={searchUsers} clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false} setAlert={showAlert} />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User { ...props } getUser={getUser} 
                  user={user} 
                  loading={loading} 
                  getUserRepos={getUserRepos}  
                  repos={repos}  />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    )
}

export default App;