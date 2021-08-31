import {
  Avatar,
  Button,
  Drawer,
  Link,
  Stack,
  Typography,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';
import MHidden from 'components/@material-extend/MHidden';
import Scrollbar from 'components/scrollbar/Scrollbar';
import { ReactElement, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import NavSection from './sidebar/NavSection';
import sidebarConfig from './sidebar/SidebarConfig';

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200],
}));

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const DashboardSidebar = (props: DashboardSidebarProps): ReactElement => {
  const { isOpen, onClose } = props;

  const { pathname } = useLocation();

  useEffect(() => {
    if (isOpen) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }} />

      <Box sx={{ mb: 5, mx: 2.5 }}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link underline="none" component={RouterLink} href="#" to="#">
          <AccountStyle>
            <Avatar>A</Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                Armory user
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Armory role
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={sidebarConfig} />
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpen}
          onClose={onClose}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
};

export default DashboardSidebar;
