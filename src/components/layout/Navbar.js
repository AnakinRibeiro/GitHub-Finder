import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = ({ icon, title }) => {
        return (
                <nav className="navbar">
                    <div className="container-nav">
                    <h1>
                        <i className={icon} />
                        <span>{title}</span>
                    </h1>

                    <ul>
                        <li>
                            <Link to='/'> Home </Link>
                        </li>
                        <li>
                            <Link to='/about'> About </Link>
                        </li>
                    </ul>
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
