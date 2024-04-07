import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AppRoutes } from './utils/routes';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import MatchPage from './pages/MatchPage/MatchPage';

function App() {
	const router = createBrowserRouter([
		{
			element: <MainLayout />,
			errorElement: <p>Not Found</p>,
			children: [
				{ path: AppRoutes.home, element: <HomePage /> },
				{ path: AppRoutes.match, element: <MatchPage /> },
				{ path: AppRoutes.league, element: <p>League</p> },
				{ path: AppRoutes.player, element: <p>Player</p> },
				{ path: AppRoutes.team, element: <p>Team</p> },
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
