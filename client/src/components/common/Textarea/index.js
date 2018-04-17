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

const Textarea = ({ value, text, name, placeholder, onChange, title }) => {

    // debugger;

    function handleChange(event) {
        const {value} = event.target;
        onChange(value, name, event);
    }
  return (
          <div className="textarea form-group">
         <label for={name}>{title}</label>   
          <textarea
            className="form-control"
            defaultValue={value}
            value={value}
            id={name}
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
            ></textarea>
      </div>
      
  );
};

Textarea.propTypes = propTypes;

export default Textarea;