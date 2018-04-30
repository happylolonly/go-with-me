import React from 'react';
// import { Redirect } from 'react-router';
import { Route, IndexRedirect, IndexRoute } from 'react-router';


import App from './App';

import requireAuth from './pages/requireAuth';


import DashboardPage from 'pages/Dashboard/DashboardContainer';


import ListsPage from 'pages/Lists/ListsContainer';
import ListPage from 'pages/List/ListContainer';

import FriendsPage from 'pages/Friends/FriendsContainer';
import FriendPage from 'pages/Friend/FriendContainer';

import EventsPage from 'pages/Events/EventsContainer';
import EventPage from 'pages/Event/EventContainer';

import LandingPage from 'pages/Landing/Landing';
import ProfilePage from 'pages/Profile/ProfileContainer';


export default (
	<Route path="/" component={App}>
		{/* <IndexRedirect to="campaigns" /> */}
		<IndexRoute components={LandingPage} />

		<Route path="dashboard" components={requireAuth(DashboardPage)}>
			<Route path="lists" components={ListsPage} />
			<Route path="lists/new" components={ListPage} />
			<Route path="lists/:id" components={ListPage} />

			<Route path="friends" components={FriendsPage} />
			<Route path="friends/new" components={FriendPage} />
			<Route path="friends/:id" components={FriendPage} />

			<Route path="events" components={EventsPage} />
			<Route path="events/new" components={EventPage} />
			<Route path="events/:id" components={EventPage} />

			<Route path="profile" components={ProfilePage} />
		</Route>

		{/* <Route path="*" components={NotFoundPage} /> */}
	</Route>
);
