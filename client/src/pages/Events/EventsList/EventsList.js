import React from 'react';
import PropTypes from 'prop-types';

import EventsListItem from './EventsListItem/EventsListItem';

import './EventsList.scss';


const propTypes = {
    events: PropTypes.array.isRequired,
    deleteEvent: PropTypes.func.isRequired,
}

const EventsList = ({ events, deleteEvent }) => {
    return (
        <div className="events-list">

            {events.map(item => {
                const { _id: id, title } = item;

                return (
                    <EventsListItem
                        key={id}
                        
                        id={id}
                        title={title}
                        deleteEvent={deleteEvent}
                    />  
                );
            })}

        </div>
    )
}

EventsList.propTypes = propTypes;

export default EventsList;
