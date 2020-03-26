import App from '../App';
import Paths from './Paths';
import Login from '../Login/login';
import Dashboard from '../Dashboard/dashboard';

const routes = [
    {
        component: App,
        routes: [
            {
                path: Paths.Login,
                exact: true,
                component: Login
            },
            {
                path: Paths.Dashboard,
                exact: true,
                component: Dashboard
            },

        ]
    }
]


export default routes;
