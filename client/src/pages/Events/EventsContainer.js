import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { API } from 'constants/config';
import { Link } from 'react-router';

const propTypes = {
    
}


class Campaigns extends Component {
  constructor() {
    super();

    this.state = {
        events: []
    }

  }

  componentDidMount() {
      this.loadEvents();
  }

  async loadEvents() {

      try {
        const data = await axios.get(`${API}/events`);
    
        const events = data.data;
        this.setState({ events })
    } catch (error) {
        console.log(error);
    }

  }

  async deleteEvent(id) {

    try {
        const data = await axios.delete(`${API}/events?id=${id}`);
        
        this.loadEvents();

        // const events = data.data;
        // this.setState({ events })
    } catch (error) {
        console.log(error);
    }

  }

  render() {
    return (
        <div>
            <h2>Мероприятия</h2>
            <p>Создавай мероприятия и все твои друзья узнают про него!</p>

            <Link to="/events/new">Создать новое</Link>

            {this.state.events.map(item => {
                const { _id: id, title } = item;
                return (
                    <div>
                        <h5>{title}</h5>
                        <Link to={`/events/${id}`}>Посмотреть</Link>
                        <button onClick={() => this.deleteEvent(id)}>удалить</button>
                    </div>
                )
            })}


        
        </div>
    )
  }
}

Campaigns.propTypes = propTypes;

export default Campaigns;