import React, { useReducer } from 'react';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import api from '../../services/Api';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search Users
    const searchUsers = async text => {
        setLoading();

        const response = await api.get(`/search/users?q=${text}&client_id=${githubClientId}&
        client_secret=${githubClientSecret}`
        );

        dispatch({
            type: SEARCH_USERS,
            payload: response.data.items
        })
    };

    // Get User
    const getUser = async (username) => {
        setLoading();

        const response = await api.get(`/users/${username}?client_id=${githubClientId}&
        client_secret=${githubClientSecret}`
        );

        dispatch({
            type: GET_USER,
            payload: response.data
        })
    }

    // Get Repos
    const getUserRepos = async (username) => {
        setLoading();

        const response = await api.get(`/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&
        client_secret=${githubClientSecret}`
        );

        dispatch({
            type: GET_REPOS,
            payload: response.data
        })
    }

    // Clear Users
    const clearUsers = () => dispatch({ type: CLEAR_USERS })

    // Set loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}
    >
        {props.children}
    </GithubContext.Provider>
}

export default GithubState;