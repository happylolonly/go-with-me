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


  async deleteFriend(id) {

    try {
        await axios.delete(`${API}/friend`, {
            params: {
                id,
            }
        });


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
            <Link to="/dashboard/friends/new">Добавить</Link>

            {this.state.friends.map(item => {
                const { _id, name } = item;
                return (
                    <div className="card">
                        <h5>{name}</h5>
                        <Link to={`/dashboard/friends/${_id}`}>Посмотреть</Link>
                        {/* <button onClick={() => this.handleDelete(_id)}>Удалить</button> */}

                    </div>
                )
            })}


        
        </div>
    )
  }
}

Campaigns.propTypes = propTypes;

export default Campaigns;
