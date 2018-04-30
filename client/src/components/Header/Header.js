import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import axios from 'axios';
import { API } from 'constants/config';


import './Header.scss';


const propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

const Header = ({ auth, logout }) => {
    
    return (
        <div className="header">
            <p>Go with me</p>
            <p>Собери друзей на мероприятие быстро!</p>
            {auth.authorized && <button onClick={logout}>Выйти</button>}
        </div >
    )
}

Header.propTypes = propTypes;

export default Header;
