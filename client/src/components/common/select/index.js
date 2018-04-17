import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { debug } from 'util';


const propTypes = {
    // value: PropTypes.string
    // text
    // placeholder
    // onChange
    // name
    // title
    // options

};

const Select = ({ value, text, name, placeholder, onChange, title, options }) => {

    function handleChange(event) {
        const { value } = event.target;
        onChange(value, name, event);
    }

    function renderOptions() {


        if (Array.isArray(options)) {
            return options.map(item => {
                return <option key={item} value={item}> {item}</option>
            })
        } else {
            return Object.keys(options).map(item => {
                return <option key={item} value={item}> {options[item]}</option>
            });
        }

    }

  return (
      <div className="form-group">
        <label htmlFor={name}>{title}</label>   
        <select
            className="form-control"
            type="text"
            id={name}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
        >
            <option value="">Select {title && title.toLowerCase() || name}</option>
            {renderOptions()}
        </select>
      </div>
      
  );
};

Select.propTypes = propTypes;

export default Select;