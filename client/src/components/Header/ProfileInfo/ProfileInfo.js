import React from 'react';
import PropTypes from 'prop-types';

import './ProfileInfo.scss';


const propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatar: PropTypes.string,
};

const ProfileInfo = ({ firstName, lastName, avatar }) => {
    return (
        <div className="profile-info">
            <div>
                Привет,
                <span>{firstName}</span>
                <span>{lastName}</span>
            </div>
            {avatar && <img src={avatar} alt="avatar" />}
        </div>

    );
}

ProfileInfo.propTypes = propTypes;

export default ProfileInfo;
