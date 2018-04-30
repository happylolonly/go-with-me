import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';
import { Input, Textarea, Select, Button } from 'components/common';

import './Event.scss';


const propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    list: PropTypes.string.isRequired,

    titleError: PropTypes.string,
    linkError: PropTypes.string,
    listError: PropTypes.string,

    lists: PropTypes.object.isRequired,

    handleData: PropTypes.func.isRequired,
    createEvent: PropTypes.func.isRequired,
    updateEvent: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,

    isNew: PropTypes.bool.isRequired,
};

const Event = ({ title, link, description, list, titleError, linkError, listError, lists, handleData, createEvent, updateEvent, deleteEvent, validate, isNew }) => {

    const handleSubmit = () => {
        if (validate()) {
            isNew ? createEvent() : updateEvent();
        }
    }

    return (
        <div className="event">
            <h2>{isNew ? 'Создать' : 'Изменить'} мероприятие</h2>

            <Input
                name="title"
                title="Название мероприятия"
                value={title}
                onChange={handleData}
                error={titleError}
            />

            <Input
                name="link"
                title="Ссылка на мероприятие"
                value={link}
                onChange={handleData}
                error={linkError}
            />

            <Textarea
                name="description"
                title="Описание (комментарии)"
                value={description}
                onChange={handleData}
            />

            <Select
                title="Список друзей"
                name="list"
                options={lists}
                value={list}
                onChange={handleData}
                error={listError}
            />

            <Link to="dashboard/events">Вернуться</Link>
            <Button type="success" text={isNew ? 'Создать' : 'Изменить'} onClick={handleSubmit} />
            {!isNew && <Button type="danger" text="Удалить" onClick={deleteEvent} />}
        </div>
    )
}

Event.propTypes = propTypes;

export default Event;
