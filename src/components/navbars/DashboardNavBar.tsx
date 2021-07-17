import {
  AppBar,
  Hidden,
  IconButton,
  Toolbar,
  createStyles,
  Theme,
  Tooltip,
  WithStyles,
  withStyles,
  Grid,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  ListItemIcon,
  Typography,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { useState } from 'react';
import { logout } from '../../modules/users/Service';
import { useAppDispatch } from '../../common/hooks';
import Breadcrumb from '../routes/Breadcrumb';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -theme.spacing(1),
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  });

interface DashboardNavBarProps extends WithStyles<typeof styles> {
  handleDrawerToggle: () => void;
}

const DashboardNavBar = (props: DashboardNavBarProps): React.ReactElement => {
  const { classes, handleDrawerToggle } = props;

  const [openNotification, setOpenNotification] = useState<null | HTMLElement>(
    null,
  );
  const [openProfile, setOpenProfile] = useState<null | HTMLElement>(null);

  const handleClickNotification = (event: React.MouseEvent<HTMLElement>) => {
    if (
      openNotification &&
      openNotification.contains(event.target as HTMLElement)
    ) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };

  const handleCloseNotification = () => {
    setOpenNotification(null);
  };

  const handleClickAccount = (event: React.MouseEvent<HTMLElement>) => {
    if (openProfile && openProfile.contains(event.target as HTMLElement)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };

  const handleCloseAccount = () => {
    setOpenProfile(null);
  };

  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    handleCloseAccount();
    await logout(dispatch);
  };

  return (
    <>
      <AppBar elevation={0} position="sticky">
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawe"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Hidden smDown>
              <Grid item>
                <Breadcrumb />
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
              <Tooltip title="Notificaciones">
                <IconButton color="inherit" onClick={handleClickNotification}>
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Popper
              open={Boolean(openNotification)}
              anchorEl={openNotification}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseNotification}>
                      <MenuList role="menu">
                        <MenuItem>
                          <Typography variant="inherit">
                            No hay notificaciones
                          </Typography>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            <Grid item>
              <IconButton color="inherit" onClick={handleClickAccount}>
                <AccountCircle />
              </IconButton>
            </Grid>
            <Popper
              open={Boolean(openProfile)}
              anchorEl={openProfile}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseAccount}>
                      <MenuList role="menu">
                        <MenuItem onClick={handleCloseAccount}>
                          <ListItemIcon>
                            <AccountCircleIcon fontSize="small" />
                          </ListItemIcon>
                          <Typography variant="inherit">
                            Perfil de usuario
                          </Typography>
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                          <ListItemIcon>
                            <ExitToAppIcon fontSize="small" />
                          </ListItemIcon>
                          <Typography variant="inherit">
                            Cerrar sesión
                          </Typography>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default withStyles(styles)(DashboardNavBar);
