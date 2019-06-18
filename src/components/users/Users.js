import React, { Component } from 'react'
import UserItem from './UserItem';

import api from '../../services/Api';

class Users extends Component {
    state = {
        users: [],
    };

    async componentDidMount() {
        const response = await api.get('users');

        this.setState({ users: response.data });
    }

    render() {
        return (
            <div style={userStyle}>
                {this.state.users.map(user => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        )
    }
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users
