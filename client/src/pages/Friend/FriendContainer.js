import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import { API } from 'constants/config';
import { browserHistory } from 'react-router';


import { Input } from 'components/common';

const propTypes = {
    
}


class Campaigns extends Component {
  constructor() {
    super();

    this.state = {
        data: {
            name: '',
            link: ''
        }
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

  handleChange(value, name) {
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
          source: 'vk',
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
                title="Cсылка на друга"
                name="link"
                placeholder="Ссылка"
                onChange={this.handleChange}
                value={this.state.data.link}
            />

            <button onClick={this.handleSubmit}>Добавить друга</button> 
        
        </div>
    )
  }
}

Campaigns.propTypes = propTypes;

export default Campaigns;
