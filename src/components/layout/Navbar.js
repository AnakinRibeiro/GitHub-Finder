import React from 'react'
import PropTypes from 'prop-types'

import './Navbar.css';

const Navbar = ({ icon, title }) => {
        return (
                <nav className="navbar">
                    <div className="container">
                    <h1>
                        <i className={icon} />
                        <span>{title}</span>
                    </h1>
                    </div>
                </nav>
        );
};

Navbar.defaultProps = {
    title: 'Github Finder',
    icon: 'fab fa-github',
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};
export default Navbar
