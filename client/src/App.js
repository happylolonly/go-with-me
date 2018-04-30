import React, { Component } from 'react';

import Footer from 'components/Footer/Footer';
import ErrorBondary from 'components/error-bondary';

// import { renderRoutes } from 'react-router-config';
// {/* {renderRoutes(this.props.route.routes)} */}

import './App.scss';


class App extends Component {

    render() {
        return (
            <ErrorBondary>
                <div className="app">

                    <div className="content">
                        {this.props.children}
                    </div>

                    <Footer />
                </div>
            </ErrorBondary>
        );
    }
}

export default App;
