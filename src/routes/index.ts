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
  RegisterAmmunition,
  Ammunition,
  RegisterEquipment,
  Equipments,
  RegisterExplosive,
  Explosives,
  RegisterWeapon,
  Weapons,
  RegisterTroop,
  Troopers,
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
  {
    path: '/dashboard/ammunition/register',
    component: RegisterAmmunition,
  },
  {
    path: '/dashboard/ammunition',
    exact: true,
    component: Ammunition,
  },
  {
    path: '/dashboard/equipments/register',
    component: RegisterEquipment,
  },
  {
    path: '/dashboard/equipments',
    exact: true,
    component: Equipments,
  },
  {
    path: '/dashboard/explosives/register',
    component: RegisterExplosive,
  },
  {
    path: '/dashboard/explosives',
    exact: true,
    component: Explosives,
  },
  {
    path: '/dashboard/weapons/register',
    component: RegisterWeapon,
  },
  {
    path: '/dashboard/weapons',
    exact: true,
    component: Weapons,
  },
  {
    path: '/dashboard/troopers/register',
    component: RegisterTroop,
  },
  {
    path: '/dashboard/troopers',
    exact: true,
    component: Troopers,
  },
];

export default routes;
