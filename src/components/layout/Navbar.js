import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Navbar.css';

class Navbar extends Component {
    static defaultProps = {
        title: 'Github Finder',
        icon: 'fab fa-github',
    };

    static propTypes = {
        title: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
    };

    render() {
        return (
            <nav className="navbar bg-primary">
                <h1>
                    <i className={this.props.icon} />
                    <span>{this.props.title}</span>
                </h1>
            </nav>
        )
    }
}

export default Navbar
