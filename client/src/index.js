import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
// import { renderRoutes } from 'react-router-config';


import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers';
// import types from 'constants/types';
import Routes from './routes';

// import { browserHistory } from 'react-router';
import { auth } from 'actions/auth';

import './index.scss';

import registerServiceWorker, { unregisterSW } from './registerServiceWorker';

const logger = createLogger({ collapsed: true });

const createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

// const auth = JSON.parse(localStorage.getItem('auth') || null);
// const savedEvents = JSON.parse(localStorage.getItem('savedEvents') || null);

ReactDOM.hydrate(
	<Provider store={store}>
	    <Router history={browserHistory} routes={Routes} />

 </Provider>,
  document.getElementById('root')
);

if (window.location.pathname !== '/auth/google') {
	store.dispatch(auth());
}


// if (auth) {
// 	// store.dispatch({
// 	// 	type: types.SETUP_SOURCES,
// 	// 	payload: sources,
// 	// })
// 	browserHistory.push('/dashboard');
// }

		// <BrowserRouter routes={Routes}>
		// 	{/* <div>{renderRoutes(Routes)}</div> */}
		// </BrowserRouter>

// registerServiceWorker();
unregisterSW();
