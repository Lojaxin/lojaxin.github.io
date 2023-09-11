import React from 'react';
import Home from './pages/home';
import Other from './pages/other';

const routes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: 'other',
        element: <Other />,
    },
];

export default routes;