import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import React from 'react';
import clsx from 'clsx';
import Categories from './Categories';

const styles = (theme: Theme) =>
  createStyles({
    categoryHeader: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    categoryHeaderPrimary: {
      color: theme.palette.common.white,
    },
    item: {
      paddingTop: 1,
      paddingBottom: 1,
      color: 'rgba(255, 255, 255, 0.7)',
      '&:hover,&:focus': {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
      },
    },
    itemCategory: {
      backgroundColor: '#232f3e',
      boxShadow: '0 -1px 0 #404854 inset',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    armory: {
      fontSize: 24,
      color: theme.palette.common.white,
    },
    itemActiveItem: {
      color: '#4fc3f7',
    },
    itemPrimary: {
      fontSize: 'inherit',
    },
    itemIcon: {
      minWidth: 'auto',
      marginRight: theme.spacing(2),
    },
    itemLink: {
      color: 'rgba(255, 255, 255, 0.7)',
      textDecoration: 'none',
      '&:hover,&:focus': {
        textDecoration: 'none',
      },
    },
    itemLinkActiveItem: {
      color: '#4fc3f7',
    },
    divider: {
      marginTop: theme.spacing(2),
    },
  });

interface SidebarProps
  extends Omit<DrawerProps, 'classes'>,
    WithStyles<typeof styles> {}

const Sidebar = (props: SidebarProps): React.ReactElement => {
  const { classes, ...other } = props;
  const location = useLocation();

  const activeRoute = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          key="sidebar-title"
          className={clsx(classes.armory, classes.item, classes.itemCategory)}
        >
          Armería
        </ListItem>
        {Categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem key={id} className={classes.categoryHeader}>
              <ListItemText
                classes={{ primary: classes.categoryHeaderPrimary }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, path, icon }) => (
              <Link
                key={childId}
                component={RouterLink}
                to={path}
                className={classes.itemLink}
              >
                <ListItem
                  key={childId}
                  button
                  className={clsx(
                    classes.item,
                    activeRoute(path) && classes.itemActiveItem,
                  )}
                >
                  <ListItemIcon className={classes.itemIcon}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText classes={{ primary: classes.itemPrimary }}>
                    {childId}
                  </ListItemText>
                </ListItem>
              </Link>
            ))}
            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default withStyles(styles)(Sidebar);
