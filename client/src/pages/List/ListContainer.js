import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import { API } from 'constants/config';
import { browserHistory } from 'react-router';


import { Input, Select } from 'components/common';

const propTypes = {
    
}


class Campaigns extends Component {
  constructor() {
    super();

    this.state = {
        data: {
            listFriends:['']
        },
        friends: [],

    }

    // this.isNew = this.props.params.id.includes('new');

    this.handleSubmit = this.handleSubmit.bind(this);
    this.addNewFriend = this.addNewFriend.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  componentDidMount() {

    if (this.isNew) {
    }
    this.loadFriends();

  }

  handleChange(value, name) {
      this.setState({
          data: {
              ...this.state.data,
              [name]: value
          }
      })
  }

  async createList() {

    try {
      await axios.post(`${API}/lists`, this.state.data);

      browserHistory.push('dashboard/lists');

  } catch (error) {
      console.log(error);
  }
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

  handleSubmit() {
      const { title, listFriends } = this.state.data;
      if (title && listFriends.length) {
          this.createList();
      }
  }

  addNewFriend() {
    //   const l = this.state.data.listFriends.length;
    const newFriends = this.state.data.listFriends;

    newFriends.push('')

    this.setState({
        data: {
            ...this.state.data,
            listFriends: newFriends
        }
    })
  }
  

//   async loadFriend() {

//     try {
//       const data = await axios.get(`${API}/friend`);
  
//       const friend = data.data;
//       this.setState({ friends })
//   } catch (error) {
//       console.log(error);
//   }



handleChange2(i) {
    return (value) => {

        const current = this.state.data.listFriends;

        current[i] = value;

        this.setState({
            data: {
                ...this.state.data,
                listFriends: current
            }
        })

    }
}



  render() {
    console.log(this.state);
    return (
        <div>
            <Input
                title="Название списка"
                placeholder="Название"
                name="title"
                onChange={this.handleChange}
                value={this.state.data.title}
            />

            <button onClick={this.addNewFriend}>Добавить еще друга</button>


            {this.state.data.listFriends.map((item, i) => {

                const obj = {};
            this.state.friends.forEach(item => {
                        obj[item._id] =  item.name  
            })

                // const { }
                return (
                    <Select
                        title="Cсылка на друга"
                        placeholder="Ссылка"
                        options={obj}
                        onChange={this.handleChange2(i)}
                        value={this.state.data.listFriends[i]}
                    />
                )
            })}


            <button onClick={this.handleSubmit}>Создать список</button> 
        
        </div>
    )
  }
}

Campaigns.propTypes = propTypes;

export default Campaigns;
