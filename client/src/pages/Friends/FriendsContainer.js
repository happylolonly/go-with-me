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
        friends: []
    }

  }

  componentDidMount() {
      this.loadFriends();
  }

  async loadFriends() {

      try {
        const data = await axios.get(`${API}/friends`);
    
        const friends = data.data;
        this.setState({ friends })
    } catch (error) {
        console.log(error);
    }

  }

  render() {
    return (
        <div>
            <h2>Друзья</h2>
            <p>Добавь своих друзей с ссылками на них</p>

            {/* <button onClick>Add new</button> */}
            <Link to="dashboard/friends/new">Добавить</Link>

            {this.state.friends.map(item => {
                const { id, name } = item;
                return (
                    <div className="card">
                        <h5>{name}</h5>
                        {/* <Link to={`/friends/${id}`}>Посмотреть</Link> */}
                        <p>Изменить пока нельзя</p>
                    </div>
                )
            })}


        
        </div>
    )
  }
}

Campaigns.propTypes = propTypes;

export default Campaigns;
