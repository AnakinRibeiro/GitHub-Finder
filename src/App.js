import React, { Component } from 'react';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import api from './services/Api';
import './App.css';

class App extends Component {

  state = {
    users: [],
    loading: false
  };

  async componentDidMount() {
    this.setState({ loading: true });

    // Github API Key
    const response = await api.get(`users?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: response.data, loading: false });
  }

  // Search Github users
  searchUsers = async text => {
    this.setState({ loading: true });

      const response = await api.get(`/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  );

    this.setState({ users: response.data.items, loading: false });
  };

  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className="container">
          <Search searchUsers={this.searchUsers} />
          <Users loading={this.state.loading}  users={this.state.users} />
        </div>
      </div>
    )
  }
}

export default App;