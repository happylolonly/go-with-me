import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';

import './EventsListItem.scss';


const propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    deleteEvent: PropTypes.func.isRequired,
};

const EventsListItem = ({ id, title, deleteEvent }) => {

    const handleDelete = () => {
        deleteEvent(id);
    }

    return (
        <div className="events-list-item card">
            <h5>{title}</h5>
            <Link to={`/events/${id}`}>Посмотреть</Link>
            <button className="delete" onClick={handleDelete}>Удалить</button>
        </div>
    );
}

EventsListItem.propTypes = propTypes;

export default EventsListItem;
