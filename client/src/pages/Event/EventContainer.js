import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { API } from 'constants/config';
import { browserHistory } from 'react-router';

import { Input, Select, Textarea } from 'components/common';

const propTypes = {
    
}


class Campaigns extends Component {
  constructor() {
    super();

    this.state = {
        events: [],
        data: {
            title: '',
            link: '',
            description: '',
        },
        lists: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
      this.loadLists();
  }

  handleChange(value, name) {
      this.setState({
          data: {
              ...this.state.data,
              [name]: value,
          }
      })
  }

  async loadLists() {

      try {
        const data = await axios.get(`${API}/lists`);
    
        const lists = data.data;
        this.setState({ lists })
    } catch (error) {
        console.log(error);
    }

  }

  async createEvent() {

    try {
      await axios.post(`${API}/events`, this.state.data);

      alert('Мероприятие создано');

      browserHistory.push('/events');
  
    //   this.setState({ events })
  } catch (error) {
      console.log(error);
  }

}

  handleSubmit() {
      this.createEvent();
  }

  render() {

    console.log(this.state)

    const obj = {};
    this.state.lists.forEach(item => {
                obj[item._id] =  item.title  
    });

    console.log(obj)


    return (
        <div>
            <h2>Создать мероприятие</h2>


            <Input
                title="Название мероприятия"
                name="title"
                // placeholder="Имя"
                onChange={this.handleChange}
                value={this.state.data.title}
            />

            <Input
                title="Ссылка на мероприятие"
                name="link"

                // placeholder="Ссылка"
                onChange={this.handleChange}
                value={this.state.data.link}
            />

            <Textarea
                title="Описание мероприятия"
                name="description"

                // placeholder="Имя"
                onChange={this.handleChange}
                value={this.state.data.description}
            />


            <Select
                title="Список друзей"
                name="list"
                // placeholder="Ссылка"
                options={obj}
                onChange={this.handleChange}
                value={this.state.data.list}
            />

    
            <button onClick={this.handleSubmit}>Создать мероприятие</button>
        </div>
    )
  }
}

Campaigns.propTypes = propTypes;

export default Campaigns;