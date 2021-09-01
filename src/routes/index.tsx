import Typography from '@material-ui/core/Typography';
import Storage from 'common/plugins/Storage';
import DashboardLayout from 'components/layouts/dashboard';
import { ReactElement } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';

import {
  Ammunition,
  Degrees,
  Equipments,
  Explosives,
  Login,
  Ranks,
  RegisterAmmunition,
  RegisterAssignedWeaponMagazineFormat,
  RegisterDegree,
  RegisterEquipment,
  RegisterExplosive,
  RegisterPerson,
  RegisterRank,
  RegisterSquad,
  RegisterSquadron,
  RegisterTroop,
  RegisterWarMaterialAndSpecialEquipmentAssigmentFormat,
  RegisterWarMaterialDeliveryCertificateFormat,
  RegisterWeapon,
  Squadrons,
  Squads,
  Troopers,
  Weapons,
} from './LazyComponents';

interface RouterProps {
  isAuth: boolean;
}

const Router = ({ isAuth }: RouterProps): ReactElement | null => {
  const { pathname } = useLocation();
  if (pathname !== '/login') {
    Storage.set('last_path', pathname);
  }

  return useRoutes([
    {
      path: '/dashboard',
      element: isAuth ? <DashboardLayout /> : <Navigate to="/login" replace />,
      children: [
        {
          path: '',
          element: <Typography variant="h4">Bienvenido</Typography>,
        },
        {
          path: '/people/register',
          element: <RegisterPerson />,
        },
        {
          path: 'squadrons',
          children: [
            {
              path: '',
              element: <Navigate to="/dashboard/squadrons/all" />,
            },
            {
              path: 'register',
              element: <RegisterSquadron />,
            },
            {
              path: 'all',
              element: <Squadrons />,
            },
          ],
        },
        {
          path: 'squads',
          children: [
            {
              path: '',
              element: <Navigate to="/dashboard/squads/all" />,
            },
            {
              path: 'register',
              element: <RegisterSquad />,
            },
            {
              path: 'all',
              element: <Squads />,
            },
          ],
        },
        {
          path: 'ranks',
          children: [
            {
              path: '',
              element: <Navigate to="/dashboard/ranks/all" />,
            },
            {
              path: 'register',
              element: <RegisterRank />,
            },
            {
              path: 'all',
              element: <Ranks />,
            },
          ],
        },
        {
          path: 'degrees',
          children: [
            {
              path: '',
              element: <Navigate to="/dashboard/degrees/all" />,
            },
            {
              path: 'register',
              element: <RegisterDegree />,
            },
            {
              path: 'all',
              element: <Degrees />,
            },
          ],
        },
        {
          path: 'ammunition',
          children: [
            {
              path: '',
              element: <Navigate to="/dashboard/ammunition/all" />,
            },
            {
              path: 'register',
              element: <RegisterAmmunition />,
            },
            {
              path: 'all',
              element: <Ammunition />,
            },
          ],
        },
        {
          path: 'equipments',
          children: [
            {
              path: '',
              element: <Navigate to="/dashboard/equipments/all" />,
            },
            {
              path: 'register',
              element: <RegisterEquipment />,
            },
            {
              path: 'all',
              element: <Equipments />,
            },
          ],
        },
        {
          path: 'explosives',
          children: [
            {
              path: '',
              element: <Navigate to="/dashboard/explosives/all" />,
            },
            {
              path: 'register',
              element: <RegisterExplosive />,
            },
            {
              path: 'all',
              element: <Explosives />,
            },
          ],
        },
        {
          path: 'weapons',
          children: [
            {
              path: '',
              element: <Navigate to="/dashboard/weapons/all" />,
            },
            {
              path: 'register',
              element: <RegisterWeapon />,
            },
            {
              path: 'all',
              element: <Weapons />,
            },
          ],
        },
        {
          path: 'troopers',
          children: [
            {
              path: '',
              element: <Navigate to="/dashboard/troopers/all" />,
            },
            {
              path: 'register',
              element: <RegisterTroop />,
            },
            {
              path: 'all',
              element: <Troopers />,
            },
          ],
        },
        {
          path: 'formats',
          children: [
            {
              path: '',
              element: <Navigate to="/dashboard/" />,
            },
            {
              path: 'assigned-weapon-magazine-format',
              element: <RegisterAssignedWeaponMagazineFormat />,
            },
            {
              path: 'war-material-delivery-certificate-format',
              element: <RegisterWarMaterialDeliveryCertificateFormat />,
            },
            {
              path: 'war-material-and-special-equipment-assigment-format',
              element: (
                <RegisterWarMaterialAndSpecialEquipmentAssigmentFormat />
              ),
            },
          ],
        },
      ],
    },
    {
      path: '/login',
      element: !isAuth ? (
        <Login />
      ) : (
        <Navigate to={Storage.get('last_path') || '/'} replace />
      ),
    },
    {
      path: '/',
      element: <Navigate to="/dashboard" replace />,
    },
  ]);
};

export default Router;
