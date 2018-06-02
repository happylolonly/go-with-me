import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';

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
            <p>Приложение позволяет создавать списки друзей из&nbsp;разных источников (вк, фб&nbsp; телеграм&nbsp; тд) и&nbsp;потом быстро отправлять всем приглашения на&nbsp;какое нибудь мероприятие</p>
          </div>
        </section>

        <section className="login">
          <h2 className="login__title">Войти через соц. сети</h2>
          <a href="/auth/vk" className="vk"><img src="/images/vk.svg" alt="vk"/></a>
          <a href="/auth/google" className="vk"><img src="/images/google.svg" alt="google"/></a>
        </section>

        <section className="groups">
          <p>Группы на которые тебе (и друзьям) необходимо подписаться и отправить первый раз любое сообщение чтобы получать уведомления:</p>
          <a href="https://vk.com/bot_friendy" target="_blank">Vk</a>
          <a href="https://www.facebook.com/Бот-Френди-204430280346743/" target="_blank">Facebook</a>
          <a href="https://web.telegram.org/#/im?p=@FrendyEventBot" target="_blank">Телеграм</a>
          <a href="#">Viber (скоро)</a>

          <p>на дизайн сайта нету времени ;)</p>
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

        <section className="preview">
          <p>вот такие уведомления тебе будут приходить</p>
          <img src="/images/preview.jpg" alt=""/>
        </section>
      </div>
    )
  }
}

// Campaigns.propTypes = propTypes;

export default Campaigns;
