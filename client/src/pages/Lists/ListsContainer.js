import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import { API } from 'constants/config';
import { Link } from 'react-router';


class Campaigns extends Component {
    constructor() {
        super();

        this.state = {
            lists: []
        }
    }

    componentDidMount() {
        this.loadLists();
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

    async handleDelete(id) {
        this.deleteList(id);
    }


    async deleteList(id) {
        try {
            await axios.delete(`${API}/list`, {
                params: {
                    id,
                }
            });

            this.loadLists();
        } catch (error) {
            console.log(error);
        }
    }


    render() {
        console.log(this.state);
        return (
            <div>
                <h2>Списки</h2>
                <p>Добавить друзей в списки</p>

                {/* <button onClick>Add new</button> */}
                <Link to="dashboard/lists/new">Создать список</Link>

                {this.state.lists.map(item => {
                    const { _id, title } = item;
                    return (
                        <div className="card">
                            <h5>{title}</h5>
                            <Link to={`/dashboard/lists/${_id}`}>Посмотреть</Link>
                            {/* <p> */}
                            {/* <button onClick={() => this.handleDelete(_id)}>Удалить</button> */}

                        </div>
                    )
                })}

            </div>
        )
    }
}

// Campaigns.propTypes = propTypes;

export default Campaigns;
