import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUser } from 'actions/user';

// import { Link } from 'react-router';

import './Profile.scss';

const propTypes = {
    getUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
}

class ProfileContainer extends Component {
    constructor() {
        super();

        this.state = {
        }
    }

    componentDidMount() {
        this.props.getUser();
    }

    render() {
        console.log(this.state);

        const { firstName, lastName, avatar } = this.props.user.data;
        return (
            <div>
                <p>{JSON.stringify(this.props.user.data && this.props.user.data.login)}</p>
                <p>{firstName} {lastName} {avatar}</p>
            </div>
        )
    }
}

const mapStateToProps = ({ user }) => {
    return { user }
}

ProfileContainer.propTypes = propTypes;

export default connect(mapStateToProps, { getUser })(ProfileContainer);
