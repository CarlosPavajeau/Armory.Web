import { RouteProps } from 'react-router-dom';
import Login from './pages/login/Login';
import RegisterPerson from './pages/people/RegisterPerson';
import RegisterSquadron from './pages/squadron/RegisterSquadron';
import Squadrons from './pages/squadron/Squadrons';

type Routes = RouteProps[];

const routes: Routes = [
  {
    path: '/login',
    component: Login,
    exact: true,
  },
];

const dashboardRoutes: Routes = [
  {
    path: '/dashboard/squadrons/register',
    component: RegisterSquadron,
  },
  {
    path: '/dashboard/squadrons',
    component: Squadrons,
  },
  {
    path: '/dashboard/people/register',
    component: RegisterPerson,
  },
];

export { routes, dashboardRoutes };
