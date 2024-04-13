import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AppRoutes } from './utils/routes';

import MainLayout from './layouts/MainLayout';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import HomePage from './pages/HomePage/HomePage';
import MatchPage from './pages/MatchPage/MatchPage';
import LeaguePage from './pages/LeaguePage/LeaguePage';
import PlayerPage from './pages/PlayerPage/PlayerPage';
import TeamPage from './pages/TeamPage/TeamPage';

function App() {
	const router = createBrowserRouter([
		{
			element: <MainLayout />,
			errorElement: <NotFoundPage />,
			children: [
				{ path: AppRoutes.home, element: <HomePage /> },
				{ path: AppRoutes.match, element: <MatchPage /> },
				{ path: AppRoutes.league, element: <LeaguePage /> },
				{ path: AppRoutes.player, element: <PlayerPage /> },
				{ path: AppRoutes.team, element: <TeamPage /> },
			],
		},
	]);
	return (
		<ConfigProvider
			theme={{
				token: {
					fontFamily: 'Roboto Condensed',
				},
			}}
		>
			<RouterProvider router={router} />
		</ConfigProvider>
	);
}

export default App;
