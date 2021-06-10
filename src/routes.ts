import { RouteProps } from 'react-router-dom';
import Login from './pages/login/Login';

type Routes = RouteProps[];

const routes: Routes = [
  {
    path: '/login',
    component: Login,
    exact: true,
  },
];

export default routes;
