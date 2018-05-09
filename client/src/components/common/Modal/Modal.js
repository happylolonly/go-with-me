import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

import './Modal.scss';


const propTypes = {
    close: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired,
};

class Modal extends Component {
    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentWillMount() {
        this.el = document.createElement('div');
        document.body.appendChild(this.el);
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.body.removeChild(this.el);
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(key) {
        if (key.keyCode === 27) {
            this.props.close()
        }
    }

    render() {
        return ReactDom.createPortal(
            <div className="modal">
                <div className="inner">
                    <span className="close" onClick={this.props.close}>x</span>
                    {this.props.children}
                </div>
            </div>,
            this.el
        );
    }
}

Modal.propTypes = propTypes;

export default Modal;
