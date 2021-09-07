import AddModeratorIcon from '@mui/icons-material/AddModerator';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import PeopleIcon from '@mui/icons-material/People';
import { ReactElement } from 'react';

export interface SidebarConfigItemChildren {
  title: string;
  path: string;
}

export interface SidebarConfigItem {
  title: string;
  path: string;
  icon: ReactElement;
  info?: string;
  children?: SidebarConfigItemChildren[];
}

const sidebarConfig: SidebarConfigItem[] = [
  {
    title: 'Comandantes',
    path: '/dashboard/people',
    icon: <PeopleIcon />,
    children: [
      {
        title: 'Registrar comandante',
        path: '/dashboard/people/register',
      },
      {
        title: 'Consultar comandantes',
        path: '/dashboard/people/all',
      },
    ],
  },
  {
    title: 'Escuadrillas',
    path: '/dashboard/squadrons',
    icon: <DashboardIcon />,
    children: [
      {
        title: 'Registrar escuadrilla',
        path: '/dashboard/squadrons/register',
      },
      {
        title: 'Consultar escuadrillas',
        path: '/dashboard/squadrons/all',
      },
    ],
  },
  {
    title: 'Escuadras',
    path: '/dashboard/squads',
    icon: <DashboardIcon />,
    children: [
      {
        title: 'Registrar escuadras',
        path: '/dashboard/squads/register',
      },
      {
        title: 'Consultar escuadras',
        path: '/dashboard/squads/all',
      },
    ],
  },
  {
    title: 'Cargos de operación',
    path: '/dashboard/ranks/',
    icon: <AddModeratorIcon />,
    children: [
      {
        title: 'Cargo de operación',
        path: '/dashboard/ranks/register',
      },
      {
        title: 'Consultar cargos de operación',
        path: '/dashboard/ranks/all',
      },
    ],
  },
  {
    title: 'Grados',
    path: '/dashboard/degrees/',
    icon: <AddModeratorIcon />,
    children: [
      {
        title: 'Registrar grado',
        path: '/dashboard/degrees/register',
      },
      {
        title: 'Consultar grados',
        path: '/dashboard/degrees/all',
      },
    ],
  },
  {
    title: 'Oficiales, suboficiales y soldados',
    icon: <PeopleIcon />,
    path: '/dashboard/troopers/',
    children: [
      {
        title: 'Registrar oficial, suboficial o soldado',
        path: '/dashboard/troopers/register',
      },
      {
        title: 'Consultar oficiales, suboficiales y soldados',
        path: '/dashboard/troopers/all',
      },
    ],
  },
  {
    title: 'Armas',
    icon: <AutoAwesomeIcon />,
    path: '/dashboard/weapons/',
    children: [
      {
        title: 'Registrar arma',
        path: '/dashboard/weapons/register',
      },
      {
        title: 'Consultar armas',
        path: '/dashboard/weapons/all',
      },
    ],
  },
  {
    title: 'Explosivos',
    icon: <AutoAwesomeIcon />,
    path: '/dashboard/explosives/',
    children: [
      {
        title: 'Registrar explosivo',
        path: '/dashboard/explosives/register',
      },
      {
        title: 'Consultar explosivos',
        path: '/dashboard/explosives/all',
      },
    ],
  },
  {
    title: 'Equipo especial y accesorios',
    icon: <AutoAwesomeIcon />,
    path: '/dashboard/equipments/',
    children: [
      {
        title: 'Registrar equipo especial y accesorio',
        path: '/dashboard/equipments/register',
      },
      {
        title: 'Consultar equipos especiales y accesorios',
        path: '/dashboard/equipments/all',
      },
    ],
  },
  {
    title: 'Municiones',
    icon: <AutoAwesomeIcon />,
    path: '/dashboard/ammunition/',
    children: [
      {
        title: 'Registrar municiones',
        path: '/dashboard/ammunition/register',
      },
      {
        title: 'Consultar municiones',
        path: '/dashboard/ammunition/all',
      },
    ],
  },
  {
    title: 'Formatos',
    path: '/dashboard/formats/',
    icon: <FormatAlignLeftIcon />,
    children: [
      {
        title: 'Generar formato de revista',
        path: '/dashboard/formats/assigned-weapon-magazine-format',
      },
      {
        title: 'Generar formato de acta',
        path: '/dashboard/formats/war-material-delivery-certificate-format',
      },
      {
        title: 'Generar formato de asignación',
        path: '/dashboard/formats/war-material-and-special-equipment-assigment-format',
      },
    ],
  },
];

export default sidebarConfig;
