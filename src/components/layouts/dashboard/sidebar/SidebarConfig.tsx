import ammunitionIcon from '@iconify/icons-mdi/ammunition';
import bombIcon from '@iconify/icons-mdi/bomb';
import flashlightIcon from '@iconify/icons-mdi/flashlight';
import pistolIcon from '@iconify/icons-mdi/pistol';
import { Icon, IconifyIcon } from '@iconify/react';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import PeopleIcon from '@mui/icons-material/People';
import ShieldIcon from '@mui/icons-material/Shield';
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

const getIcon = (name: IconifyIcon | string) => (
  <Icon icon={name} width={22} height={22} />
);

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
    title: 'Escuadrones',
    path: '/dashboard/squads',
    icon: <DashboardIcon />,
    children: [
      {
        title: 'Registrar escuadrón',
        path: '/dashboard/squads/register',
      },
      {
        title: 'Consultar escuadrones',
        path: '/dashboard/squads/all',
      },
    ],
  },
  {
    title: 'Escuadrillas',
    path: '/dashboard/flights',
    icon: <DashboardIcon />,
    children: [
      {
        title: 'Registrar escuadrilla',
        path: '/dashboard/flights/register',
      },
      {
        title: 'Consultar escuadrillas',
        path: '/dashboard/flights/all',
      },
    ],
  },
  {
    title: 'Escuadras',
    path: '/dashboard/fireteams',
    icon: <DashboardIcon />,
    children: [
      {
        title: 'Registrar escuadras',
        path: '/dashboard/fireteams/register',
      },
      {
        title: 'Consultar escuadras',
        path: '/dashboard/fireteams/all',
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
    icon: <ShieldIcon />,
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
    icon: getIcon(pistolIcon),
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
    icon: getIcon(bombIcon),
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
    icon: getIcon(flashlightIcon),
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
    icon: getIcon(ammunitionIcon),
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
