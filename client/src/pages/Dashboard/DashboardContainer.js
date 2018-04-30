import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from 'components/Header/Header';


import { Link } from 'react-router';

import { getUser } from 'actions/user';
import { logout } from 'actions/auth';


import './DashboardContainer.scss';


const propTypes = {
    getUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

class Dashboard extends Component {
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
        return (
            <div className="dashboard">

                      <Header
                        auth={this.props.auth}
                        logout={this.props.logout}

                        firstName={this.props.user.data.firstName}
                        lastName={this.props.user.data.lastName}
                        avatar={this.props.user.data.avatar}
                    />


                      <Link to="/dashboard">К доске</Link>


                <h2>Твоя доска</h2>
                <p>Что будем делать?</p>

                <Link to="/dashboard/friends">Друзья</Link>
                <Link to="/dashboard/lists">Списки</Link>
                <Link to="/dashboard/events">Мероприятия</Link>
                <Link to="/dashboard/profile">Твой профиль</Link>

                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = ({ auth, user }) => {
    return { auth, user }
  }

Dashboard.propTypes = propTypes;

export default connect(mapStateToProps, { getUser, logout })(Dashboard);
