import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { API } from 'constants/config';


import { Link } from 'react-router';

import './DashboardContainer.scss';



class Campaigns extends Component {
  constructor() {
    super();

    this.state = {
    }

  }

  componentDidMount() {
    this.getUser();
  }

  async getUser() {
    const data = await axios.get(`${API}/user`);

    const user = data.data;


    this.setState({ user });
  }

  render() {
    console.log(this.state);
    return (
        <div className="dashboard">
            <h2>Твоя доска</h2>
            <p>Что будем делать?</p>

            <Link to="/friends">Друзья</Link>
            <Link to="/lists">Списки</Link>
            <Link to="/events">Мероприятия</Link>
        </div>
    )
  }
}

// Campaigns.propTypes = propTypes;

export default Campaigns;