import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';

// import './DashboardContainer.scss';


class Campaigns extends Component {
  constructor() {
    super();

    this.state = {
    }

  }

  render() {
    console.log(this.state);
    return (
        <div className="landing">
            <h2>Лендинг</h2>
            <p>Войти через вк</p>
            <li><a href="/auth/google">Login With вк</a></li>;
        </div>
    )
  }
}

// Campaigns.propTypes = propTypes;

export default Campaigns;
