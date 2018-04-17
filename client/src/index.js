import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
// import { renderRoutes } from 'react-router-config';


import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers';
import types from 'constants/types';
import Routes from './routes';

import './index.scss';

import registerServiceWorker from './registerServiceWorker';

const logger = createLogger({ collapsed: true });

const createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

// const sources = JSON.parse(localStorage.getItem('events') || null);
// const savedEvents = JSON.parse(localStorage.getItem('savedEvents') || null);

// if (sources) {
// 	store.dispatch({
// 		type: types.SETUP_SOURCES,
// 		payload: sources,
// 	})
// }


ReactDOM.hydrate(
	// <Provider store={store}>
	    <Router history={browserHistory} routes={Routes} />,

	// </Provider>,
  document.getElementById('root')
);


		// <BrowserRouter routes={Routes}>
		// 	{/* <div>{renderRoutes(Routes)}</div> */}
		// </BrowserRouter>

// registerServiceWorker();
