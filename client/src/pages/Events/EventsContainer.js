import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Events from './Events';

import axios from 'axios';
import { API } from 'constants/config';


const propTypes = {
    // потом тут будет redux
};

class EventsContainer extends Component {
    constructor() {
        super();

        this.state = {
            events: [],
            serverError: null,
        };

        this.deleteEvent = this.deleteEvent.bind(this);
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
            this.setState({ serverError: JSON.stringify(error) });
        }

    }

    async deleteEvent(id) {

        try {
            await axios.delete(`${API}/events?id=${id}`);

            this.loadEvents();
        } catch (error) {
            console.log(error);
            this.setState({ serverError: JSON.stringify(error) });
        }

    }

    render() {
        return (
            <div className="events-page">

                <Events
                    events={this.state.events}
                    deleteEvent={this.deleteEvent}
                />

                {this.state.serverError && <div className="error">{this.state.serverError}</div>}

            </div>
        )
    }
}

EventsContainer.propTypes = propTypes;

export default EventsContainer;
