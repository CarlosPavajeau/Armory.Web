import AddIcon from '@material-ui/icons/Add';
import PeopleIcon from '@material-ui/icons/People';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import React from 'react';

export interface CategoryItem {
  id: string;
  path: string;
  icon: React.ReactElement;
}

type CategoryItems = CategoryItem[];

export interface Category {
  id: string;
  children: CategoryItems;
}

type Categories = Category[];

const categories: Categories = [
  {
    id: 'Personas',
    children: [
      {
        id: 'Registrar persona',
        path: '/dashboard/people/register',
        icon: <AddIcon />,
      },
    ],
  },
  {
    id: 'Escuadrillas',
    children: [
      {
        id: 'Registrar escuadrilla',
        path: '/dashboard/squadrons/register',
        icon: <AddIcon />,
      },
      {
        id: 'Consultar escuadrilla',
        path: '/dashboard/squadrons',
        icon: <PeopleIcon />,
      },
    ],
  },
  {
    id: 'Escuadras',
    children: [
      {
        id: 'Registrar escuadras',
        path: '/dashboard/squads/register',
        icon: <AddIcon />,
      },
      {
        id: 'Consultar escuadras',
        path: '/dashboard/squads',
        icon: <PeopleIcon />,
      },
    ],
  },
  {
    id: 'Rangos y grados',
    children: [
      {
        id: 'Registrar rango',
        path: '/dashboard/ranks/register',
        icon: <AddIcon />,
      },
      {
        id: 'Registrar grado',
        path: '/dashboard/degrees/register',
        icon: <AddIcon />,
      },
      {
        id: 'Rangos',
        path: '/dashboard/ranks',
        icon: <PeopleIcon />,
      },
      {
        id: 'Grados',
        path: '/dashboard/degrees',
        icon: <PeopleIcon />,
      },
    ],
  },
  {
    id: 'Armamento',
    children: [
      {
        id: 'Registrar arma',
        path: '/dashboard/weapon/register',
        icon: <AddIcon />,
      },
      {
        id: 'Registrar explosivo',
        path: '/dashboard/explosives/register',
        icon: <AddIcon />,
      },
      {
        id: 'Registrar equipo especial y accesorios',
        path: '/dashboard/equipments/register',
        icon: <AddIcon />,
      },
      {
        id: 'Registrar municiones',
        path: '/dashboard/ammunition/register',
        icon: <AddIcon />,
      },
      {
        id: 'Consultar armas',
        path: '/dashboard/weapons',
        icon: <AllInboxIcon />,
      },
      {
        id: 'Consultar municiones',
        path: '/dashboard/ammunition',
        icon: <AllInboxIcon />,
      },
    ],
  },
];

export default categories;
