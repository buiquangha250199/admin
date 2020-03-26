import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/tailwind.css';
import './css/fontawesome/css/all.min.css';
import './css/ionicons/css/ionicons.min.css';
import {renderRoutes} from 'react-router-config';
import {BrowserRouter} from 'react-router-dom';
import routes from './components/routes/Routes';


ReactDOM.render(<BrowserRouter>
    {renderRoutes(routes)}
</BrowserRouter>, document.getElementById('root'))


