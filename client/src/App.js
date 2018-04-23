import React, { Component } from 'react';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

// import { renderRoutes } from 'react-router-config';
import ErrorBondary from 'components/error-bondary';
import { Link } from 'react-router'

import './App.scss';


class App extends Component {

  // {/* <div className="sk-spinner sk-spinner-pulse"></div> */}


  render() {
    return (
      <ErrorBondary>
        <div className="app">
          <Header />

          <div className="content">
          <h2>Привет!</h2>

          <p>Чтобы получать уведомления в вк необходимо подписаться на эту группу https://vk.com/public165270834</p>
          <p>она будет отправлять сообщения</p>

          <p>регистрации пока нету)</p>
          <Link to="/dashboard">К доске</Link>

          {this.props.children}
            {/* {renderRoutes(this.props.route.routes)} */}
          </div>

          <Footer />
        </div>
      </ErrorBondary>
    );
  }
}

export default App;
