import { BoxProps } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { ReactElement } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

import NavItem from './NavItem';
import { SidebarConfigItem } from './SidebarConfig';

interface NavSectionProps extends BoxProps {
  navConfig: SidebarConfigItem[];
}

const NavSection = (props: NavSectionProps): ReactElement => {
  const { navConfig, ...other } = props;
  const { pathname } = useLocation();
  const match = (path: string) =>
    path ? !!matchPath({ path, end: false }, pathname) : false;

  return (
    <Box {...other}>
      <List disablePadding>
        {navConfig.map(item => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
};

export default NavSection;
