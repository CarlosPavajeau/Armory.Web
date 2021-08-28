import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { MouseEvent, ReactElement, useState } from 'react';

import { useAppDispatch } from '../../common/hooks';
import { logout } from '../../modules/users/Service';
import { authenticationStatus } from '../../modules/users/Slice';

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

const DashboardNavBar = (props: DashboardNavBarProps): ReactElement => {
  const { classes, handleDrawerToggle } = props;

  const [openNotification, setOpenNotification] = useState<null | HTMLElement>(
    null,
  );
  const [openProfile, setOpenProfile] = useState<null | HTMLElement>(null);

  const handleClickNotification = (event: MouseEvent<HTMLElement>) => {
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

  const handleClickAccount = (event: MouseEvent<HTMLElement>) => {
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
    const result = await logout();
    dispatch(authenticationStatus(result));
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
                <Typography>Armería</Typography>
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
                <AccountCircleIcon />
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
