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
            {/* <h2>Лендинг</h2> */}

            <h2>Привет!</h2>

<p>Прилага позволяет создавать списки друзей из разных источников (вк, фб и тд) и потом быстро отправлять всем приглашения на какое нибудь мероприятие</p>

<p>Чтобы получать уведомления в вк необходимо чтобы друзья были подписаны на эту группу https://vk.com/bot_friendy и первый раз написали ей любое сообщение</p>
<p>после чего она будет отправлять сообщения</p>

            <li><a href="/auth/google">Войти через вк</a></li>;
        </div>
    )
  }
}

// Campaigns.propTypes = propTypes;

export default Campaigns;
