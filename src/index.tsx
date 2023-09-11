import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';
import routes from './routes';
import imgSrc from '../public/img.jpg';
import './index.scss';

moment.locale('zh-cn');

const router = createBrowserRouter(routes);

const App = () => {
    return (
        <div>
            <img width={200} src={imgSrc} alt="" />
            <RouterProvider router={router} />
        </div>
    );
};
const root = createRoot(document.querySelector('#root'));
root.render(<App />);