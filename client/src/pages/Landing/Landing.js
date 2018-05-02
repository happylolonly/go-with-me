import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';
import SocialButtons from '../../components/SocialButtons/SocialButtons';

// import './DashboardContainer.scss';
import './Landing.scss';


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
        <section className="welcome">
          <div className="welcome__text">
            <h2 className="welcome__title">Привет!</h2>

            <p>Приложение позволяет создавать списки друзей из&nbsp;разных источников (вк, фб&nbsp;и&nbsp;тд) и&nbsp;потом быстро отправлять всем приглашения на&nbsp;какое нибудь мероприятие</p>

            <p>Чтобы получать уведомления в&nbsp;вк&nbsp;необходимо чтобы друзья были подписаны <a href="https://vk.com/bot_friendy" target="_blank">на&nbsp;эту группу</a> и&nbsp;первый раз написали ей&nbsp;любое сообщение</p>
            <p>после чего она будет отправлять сообщения</p>
          </div>
        </section>

        <section className="login">
          <h2 className="login__title">Войти через соц. сети</h2>
          <SocialButtons />
        </section>

        <section className="stages">
          <h2 className="stages__title">Как это работает</h2>
          <ul class="how-we-work">
            <li>
              <p class="how-we-work__title">Один раз добавляешь друзей из соц сетей</p>
            </li>
            <li>
              <p class="how-we-work__title">Создаешь мероприятие и отправляешь его друзьям</p>
            </li>
            <li>
              <p class="how-we-work__title">Все друзья получают уведомления</p>
            </li>
          </ul>
        </section>
      </div>
    )
  }
}

// Campaigns.propTypes = propTypes;

export default Campaigns;
