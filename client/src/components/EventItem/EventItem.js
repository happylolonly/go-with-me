import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import moment from 'moment';
import 'moment/locale/ru';

import './EventItem.scss';


const propTypes = {
  date: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,

  originalLink: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
}

const EventItem = ({ date, title, link, originalLink, source, mouseOver }) => {

  // console.log(link);
  return (
    <div className="event-item" onMouseOver={mouseOver}>
      <header>
        <Link to={`/event/${link}`}>{title}</Link>
        <div>
          <span className="date">{moment(date).locale('ru').format('D MMMM YYYY')}</span>
          <span className="time">{moment(date).locale('ru').format('HH:mm') !== '00:00' ? moment(date).locale('ru').format('HH:mm') : 'Время не указано'}</span>
        </div>
      </header>
      <p className="source">Источник: <a target="_blank" href={`http://${source}${originalLink}`}>{source}</a></p>

    </div>
  )
}

EventItem.propTypes = propTypes;

export default EventItem;
