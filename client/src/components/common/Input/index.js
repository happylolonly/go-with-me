import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';


const propTypes = {
    // value: PropTypes.string
    // text
    // placeholder
    // onChange
    // name
    // title

};

const Input = ({ value, text, name, placeholder, onChange, title }) => {

    function handleChange(event) {
        const {value} = event.target;
        onChange(value, name, event);
    }
  return (
      <div className="form-group">
        <label htmlFor={name}>{title}</label>   
        <input
            className="form-control"
            type="text"
            id={name}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
        />
      </div>
      
  );
};

Input.propTypes = propTypes;

export default Input;