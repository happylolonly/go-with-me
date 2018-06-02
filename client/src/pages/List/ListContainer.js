import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import { API } from 'constants/config';
import { browserHistory, Link } from 'react-router';


import { Input, Select } from 'components/common';

const propTypes = {

}


class Campaigns extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                listFriends: ['']
            },
            friends: [],

        }

        this.isNew = !this.props.params.id;

        this.deleteList = this.deleteList.bind(this);

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

        if (!this.isNew) {
            this.loadList();
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

    async loadList() {

        try {
            const data = await axios.get(`${API}/list`, {
                params: {
                    id: this.props.params.id
                }
            });

            const list = data.data;
            this.setState({
                data: {
                    listFriends: list.friends,
                    title: list.title,
                }
            });
        } catch (error) {
            console.log(error);
        }

    }

    handleSubmit() {
        const { title, listFriends } = this.state.data;
        if (title && listFriends.length) {

            if (this.isNew) {
                this.createList();

            } else {
                this.updateList();

            }

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

    async updateList() {

        try {
            await axios.put(`${API}/list`, {
                id: this.props.params.id,
                ...this.state.data
            });

            browserHistory.push('dashboard/lists');

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

    async deleteList() {
        try {
            await axios.delete(`${API}/list`, {
                params: {
                    id: this.props.params.id,
                }
            });

            browserHistory.push('dashboard/lists');

        } catch (error) {
            console.log(error);
        }
    }

    handleDelete(id) {
        const index = this.state.data.listFriends.indexOf(id);
        const arr = [...this.state.data.listFriends];
        arr.splice(index, 1);

        this.setState({
            data: {
                listFriends: arr
            }
        })
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
                        obj[item._id] = item.name
                    })

                    // const { }
                    return (
                        <div>
                            <Select
                                title="Cсылка на друга"
                                placeholder="Ссылка"
                                options={obj}
                                onChange={this.handleChange2(i)}
                                value={this.state.data.listFriends[i]}
                            />
                            <button onClick={() => this.handleDelete(item)}>Удалить</button>

                        </div>

                    )
                })}


                <button onClick={this.handleSubmit}>{this.isNew ? 'Создать список' : 'Изменить список'}</button>
                {!this.isNew && <button onClick={this.deleteList}>Удалить список</button>}

                <Link to={`/dashboard/lists`}>Вернуться</Link>


            </div>
        )
    }
}

Campaigns.propTypes = propTypes;

export default Campaigns;
