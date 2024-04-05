import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppRoutes } from './utils/routes';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage/HomePage';

function App() {
	const router = createBrowserRouter([
		{
			element: <MainLayout />,
			errorElement: <p>Not Found</p>,
			children: [
				{ path: AppRoutes.home, element: <HomePage /> },
				{ path: AppRoutes.league, element: <p>League</p> },
				{ path: AppRoutes.match, element: <p>Match</p> },
				{ path: AppRoutes.player, element: <p>Player</p> },
			],
		},
	]);
	return <RouterProvider router={router} />;
}

export default App;
