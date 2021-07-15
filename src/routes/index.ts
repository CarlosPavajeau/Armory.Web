import { RouteProps } from 'react-router-dom';
import {
  Login,
  RegisterSquadron,
  Squadrons,
  RegisterPerson,
  RegisterSquad,
  Squads,
} from './LazyComponents';

type Routes = RouteProps[];

const routes: Routes = [
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/dashboard/squadrons/register',
    component: RegisterSquadron,
  },
  {
    path: '/dashboard/squadrons',
    exact: true,
    component: Squadrons,
  },
  {
    path: '/dashboard/people/register',
    component: RegisterPerson,
  },
  {
    path: '/dashboard/squads/register',
    component: RegisterSquad,
  },
  {
    path: '/dashboard/squads',
    exact: true,
    component: Squads,
  },
];

export default routes;
