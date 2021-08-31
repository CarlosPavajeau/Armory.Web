import HomeIcon from '@material-ui/icons/Home';
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
    title: 'Inicio',
    path: '/home',
    icon: <HomeIcon width={22} height={22} />,
  },
  {
    title: 'Inicio',
    path: '/home',
    icon: <HomeIcon width={22} height={22} />,
    children: [
      {
        title: 'Inicio',
        path: '/home',
      },
    ],
  },
];

export default sidebarConfig;
