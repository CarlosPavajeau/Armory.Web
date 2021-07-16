import { RouteProps } from 'react-router-dom';
import {
  Login,
  RegisterSquadron,
  Squadrons,
  RegisterPerson,
  RegisterSquad,
  Squads,
  RegisterDegree,
  Degrees,
  Ranks,
  RegisterRank,
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
  {
    path: '/dashboard/ranks/register',
    component: RegisterRank,
  },
  {
    path: '/dashboard/ranks',
    exact: true,
    component: Ranks,
  },
  {
    path: '/dashboard/degrees/register',
    component: RegisterDegree,
  },
  {
    path: '/dashboard/degrees',
    exact: true,
    component: Degrees,
  },
];

export default routes;
