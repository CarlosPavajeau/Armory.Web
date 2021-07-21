import { ReactElement } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';

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
    itemLink: {
      color: 'rgba(255, 255, 255, 0.7)',
      textDecoration: 'none',
      '&:hover,&:focus': {
        textDecoration: 'none',
      },
    },
    itemIcon: {
      minWidth: 'auto',
      marginRight: theme.spacing(2),
    },
    itemActiveItem: {
      color: '#4fc3f7',
    },
    itemPrimary: {
      fontSize: 'inherit',
    },
  });

export interface CategoryItemProps extends WithStyles<typeof styles> {
  id: string;
  path: string;
  currentPath: string;
  icon: ReactElement;
}

const CategoryItem = (props: CategoryItemProps): ReactElement => {
  const { classes, id, path, currentPath, icon } = props;
  return (
    <Link
      key={id}
      component={RouterLink}
      to={path}
      className={classes.itemLink}
    >
      <ListItem
        key={id}
        className={clsx(
          classes.item,
          path === currentPath && classes.itemActiveItem,
        )}
        button
      >
        <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
        <ListItemText classes={{ primary: classes.itemPrimary }}>
          {id}
        </ListItemText>
      </ListItem>
    </Link>
  );
};

export default withStyles(styles)(CategoryItem);
