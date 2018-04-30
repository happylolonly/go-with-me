import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Event from './Event';

import axios from 'axios';
import { API } from 'constants/config';

import { browserHistory } from 'react-router';


const propTypes = {
    // потом тут будет redux
};

class EventContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                title: '',
                link: '',
                description: '',
                list: '',
            },
            errors: {},
            lists: {},
            serverError: null,
        };

        this.isNew = !this.props.params.id;

        this.handleChange = this.handleChange.bind(this);
        this.createEvent = this.createEvent.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {

        if (!this.isNew) {
            this.loadEvent();
        }

        this.loadLists();
    }

    async loadEvent() {

        try {
            const data = await axios.get(`${API}/event?id=${this.props.params.id}`);
            const event = data.data;

            delete event._id;

            this.setState({ data: { ...event } });
        } catch (error) {
            console.log(error);
            this.setState({ serverError: JSON.stringify(error) });
        }

    }

    async loadLists() {

        try {
            const data = await axios.get(`${API}/lists`);
            const lists = data.data;

            const formattedLists = {};

            lists.forEach(item => {
                formattedLists[item._id] = item.title;
            });

            this.setState({ lists: formattedLists });
        } catch (error) {
            console.log(error);
            this.setState({ serverError: JSON.stringify(error) });
        }

    }

    async createEvent() {

        try {
            await axios.post(`${API}/events`, this.state.data);

            browserHistory.push('dashboard/events');
        } catch (error) {
            console.log(error);
            this.setState({ serverError: JSON.stringify(error) });
        }

    }

    async updateEvent() {

        try {
            await axios.put(`${API}/event`, {
                id: this.props.params.id,
                ...this.state.data
            });

            browserHistory.push('dashboard/events');
        } catch (error) {
            console.log(error);
            this.setState({ serverError: JSON.stringify(error) });
        }

    }

    async deleteEvent() {

        try {
            await axios.delete(`${API}/events?id=${this.props.params.id}`);

            browserHistory.push('dashboard/events');
        } catch (error) {
            console.log(error);
            this.setState({ serverError: JSON.stringify(error) });
        }

    }

    handleChange(value, name) {

        this.setState({
            data: {
                ...this.state.data,
                [name]: value,
            },
            errors: {
                ...this.state.errors,
                [name]: '',
            }
        });

    }

    validate() {
        const errors = {};

        const { title, link, list } = this.state.data;

        if (!title) {
            errors.title = 'Необходимо написать название мероприятия';
        }

        if (!link) {
            errors.link = 'Необходимо поставить ссылку на мероприятие';
        }

        if (!list) {
            errors.list = 'Необходимо выбрать список друзей';
        }

        if (Object.keys(errors).length) {
            this.setState({ errors });
            return false;
        }
        return true;
    }

    render() {
        const { data, errors, lists } = this.state;

        return (
            <div className="event-page">

                <Event
                    title={data.title}
                    link={data.link}
                    description={data.description}
                    list={data.list}

                    titleError={errors.title}
                    linkError={errors.link}
                    listError={errors.list}

                    lists={lists}

                    handleData={this.handleChange}
                    createEvent={this.createEvent}
                    updateEvent={this.updateEvent}
                    deleteEvent={this.deleteEvent}
                    validate={this.validate}

                    isNew={this.isNew}
                />

                {this.state.serverError && <div className="error">{this.state.serverError}</div>}

            </div>
        )
    }
}

EventContainer.propTypes = propTypes;

export default EventContainer;
