import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import './Button.scss';


const propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
        'success',
        'danger',

    ]),
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    rest: PropTypes.array,
};

const Button = ({ text, type, className, onClick, ...rest }) => {

    const classNames = classnames(
        'button',
        type && `button-${type}`,
        className,
    );

    return (
        <button className={classNames} onClick={onClick} {...rest}>
            {text}
        </button>
    );
};

Button.propTypes = propTypes;

export default Button;
