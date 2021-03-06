import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';

import ProfileInfo from './ProfileInfo/ProfileInfo';

import './Header.scss';


const propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatar: PropTypes.string,
};

const Header = ({ auth, logout, firstName, lastName, avatar }) => {

    return (
        <div className="header">
            <div>
                <Link to="/">Go with me</Link>
                <p>Собери друзей на мероприятие быстро!</p>
            </div>
            <div className="profile-info-wrapper">
            {/* переименовать класс */}
                <ProfileInfo
                    firstName={firstName}
                    lastName={lastName}
                    avatar={avatar}
                />
                {auth.authorized && <button className="btn btn-link" onClick={logout}>Выйти</button>}
            </div>
        </div >
    )
}

Header.propTypes = propTypes;

export default Header;
