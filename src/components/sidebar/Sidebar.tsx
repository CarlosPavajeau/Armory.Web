import { Theme } from '@material-ui/core';
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { WithStyles } from '@material-ui/styles';
import createStyles from '@material-ui/styles/createStyles';
import withStyles from '@material-ui/styles/withStyles';
import clsx from 'clsx';
import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

import Categories from './Categories';
import Category from './Categories/Category';

const styles = (theme: Theme) =>
  createStyles({
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
  });

interface SidebarProps
  extends Omit<DrawerProps, 'classes'>,
    WithStyles<typeof styles> {}

const Sidebar = (props: SidebarProps): ReactElement => {
  const { classes, ...other } = props;
  const location = useLocation();

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
          <Category
            key={id}
            id={id}
            items={children}
            currentPath={location.pathname}
          />
        ))}
      </List>
    </Drawer>
  );
};

export default withStyles(styles)(Sidebar);
