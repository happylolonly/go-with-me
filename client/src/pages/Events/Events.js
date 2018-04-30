import React from 'react';
import PropTypes from 'prop-types';

import EventsList from './EventsList/EventsList';

import { Link } from 'react-router';

import './Events.scss';


const propTypes = {
    events: PropTypes.array.isRequired,
    deleteEvent: PropTypes.func.isRequired,
};

const Events = ({ events, deleteEvent }) => {
    return (
        <div className="events">
            <h2>Мероприятия</h2>
            <p>Создавай мероприятия и все твои друзья узнают про него!</p>

            <Link to="dashboard/events/new">Создать новое</Link>

            <EventsList
                events={events}
                deleteEvent={deleteEvent}
            />

        </div>
    )
}

Events.propTypes = propTypes;

export default Events;
