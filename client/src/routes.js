import React from 'react';
// import { Redirect } from 'react-router';
import { Route, IndexRedirect } from 'react-router';


import App from './App';


import DashboardPage from 'pages/Dashboard/DashboardContainer';


import ListsPage from 'pages/Lists/ListsContainer';
import ListPage from 'pages/List/ListContainer';

import FriendsPage from 'pages/Friends/FriendsContainer';
import FriendPage from 'pages/Friend/FriendContainer';

import EventsPage from 'pages/Events/EventsContainer';
import EventPage from 'pages/Event/EventContainer';


export default (
	<Route path="/" component={App}>
		{/* <IndexRedirect to="campaigns" /> */}

		<Route path="dashboard" components={DashboardPage} />

		<Route path="lists" components={ListsPage} />
		<Route path="lists/add" components={ListPage} />
		<Route path="lists/:id" components={ListPage} />

		<Route path="friends" components={FriendsPage} />
		<Route path="friends/add" components={FriendPage} />
		<Route path="friends/:id" components={FriendPage} />

		<Route path="events" components={EventsPage} />
		<Route path="events/add" components={EventPage} />
		<Route path="events/:id" components={EventPage} />
		
		{/* <Route path="*" components={NotFoundPage} /> */}
	</Route>
);
