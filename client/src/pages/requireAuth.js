import React, { Component} from 'react';
import { connect } from 'react-redux';

import { browserHistory } from 'react-router';

const propTypes = {};


const func = (Comp) => {

    class WrappedComponent extends Component {

        componentDidMount() {
            if (!this.props.auth.authorized) {
                browserHistory.push('/');
            }
        }

        componentWillReceiveProps(nextProps) {
            if (!nextProps.auth.authorized) {
                browserHistory.push('/');
            }
        }

        render() {
            return <Comp {...this.props} />
        }

    }

    const mapStateToProps = ({ auth }) => {
    return {auth}
    }

    return connect(mapStateToProps)(WrappedComponent);

}

export default func;
