import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import { API } from 'constants/config';
import { browserHistory } from 'react-router';


import { Input, Select, Modal, Textarea } from 'components/common';

const propTypes = {
    
}


class Campaigns extends Component {
  constructor() {
    super();

    this.state = {
        data: {
            name: '',
            link: '',
            source: ''
        },
        hasFriend: null,
    }

    // this.isNew = this.props.params.id.includes('new');

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

    if (this.isNew) {
        // this.loadFriend();
    }

  }

  detectSource(link) {

    let source = null;

    if (link.includes('vk.com')) {
        source = 'vk';
    } else if (link.includes('facebook.com')) {
        source = 'facebook';
    } else if (link.includes('telegram.org')) {
        source = 'telegram';
    } else if (link.includes('viber.com')) {
        //
    }

    return source;
  }

  handleChange(value, name) {


    if (name === 'link') {

        if (value) {
            this.checkFriend(value);
        }

        this.setState({
            data: {
                ...this.state.data,
                [name]: value,
                source: this.detectSource(value)
            },
            hasFriend: null,
        });

        return;


    }
      this.setState({
          data: {
              ...this.state.data,
              [name]: value
          }
      })
  }

  async addFriend() {

    try {
      await axios.post(`${API}/friends`, {
          ...this.state.data,
      });

      browserHistory.push('dashboard/friends');

  } catch (error) {
      console.log(error);
  }
}

  handleSubmit() {
      const { name, link } = this.state.data;
      if (name && link) {
          this.addFriend();
      }
  }

  renderFriendInfo(value) {

    if (value === true) {
        return (
            <div className="success">
                Отлично, у нас есть твой друг!
            </div>
        )
    } else if (value === false) {
        return (
            <div className="fail">
                Хм, кажется у нас нету такого друга:(
                <p>Попробуй отправить ему <button onClick={() => this.setState({ isModalShow: true })}>приглашение</button></p>
            </div>
        )
    }
  }

  async checkFriend(value) {
      try {
          const data = await axios.post(`${API}/friend-check`, {
              value,
          });

          const hasFriend = data.data.friend;

          this.setState({ hasFriend });
      } catch (error) {
          console.log(error);
      }
  }
  

//   async loadFriend() {

//     try {
//       const data = await axios.get(`${API}/friend`);
  
//       const friend = data.data;
//       this.setState({ friends })
//   } catch (error) {
//       console.log(error);
//   }



  render() {
    console.log(this.state);
    return (
        <div>
            <Input
                title="Имя друга"
                placeholder="Имя"
                name="name"
                onChange={this.handleChange}
                value={this.state.data.name}
            />

            <Input
                title="Cсылка на друга (или ник в телеграме)"
                name="link"
                placeholder="Ссылка"
                onChange={this.handleChange}
                value={this.state.data.link}
            />

            {this.state.hasFriend !== null && this.renderFriendInfo(this.state.hasFriend)}

            <Select
                title="Источник"
                name="source"
                placeholder="Источник"
                onChange={this.handleChange}
                value={this.state.data.source}
                options={{
                    vk: 'Vk',
                    telegram: 'Телеграм',
                    facebook: 'Фейсбук'
                }}
            />

            <button onClick={this.handleSubmit}>Добавить друга</button> 

            {this.state.isModalShow &&
                <Modal close={() => this.setState({ isModalShow: false })}>
                    <textarea
                        autoFocus
                        defaultValue={'Привет (дописать потом)'}
                    ></textarea>
                </Modal>
            }
        
        </div>
    )
  }
}

Campaigns.propTypes = propTypes;

export default Campaigns;
