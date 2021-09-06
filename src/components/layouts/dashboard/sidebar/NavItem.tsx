import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { ReactElement, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import { SidebarConfigItem } from './SidebarConfig';

const ListItemStyle = styled(props => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  '&:before': {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: 'none',
    position: 'absolute',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

interface NavItemProps {
  item: SidebarConfigItem;
  active: (path: string) => boolean;
}

const NavItem = (props: NavItemProps): ReactElement => {
  const { item, active } = props;

  const theme = useTheme();
  const isActiveRoot = active(item.path);
  const { title, path, icon, info, children } = item;
  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen(prev => !prev);
  };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity,
    ),
    '&:before': { display: 'block' },
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  };

  if (children) {
    const props = {
      onClick: handleOpen,
    };
    return (
      <>
        <ListItemStyle
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
          {...props}
        >
          <ListItemIconStyle>{icon}</ListItemIconStyle>
          <ListItemText primary={title} disableTypography />
          {info && info}
          <Box sx={{ width: 16, height: 16, ml: 1 }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </Box>
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map(item => {
              const { title, path } = item;
              const isActiveSub = active(path);
              const props = {
                component: RouterLink,
                to: path,
              };

              return (
                <ListItemStyle
                  key={title}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                  {...props}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: theme =>
                          theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'primary.main',
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  const listItem = {
    component: RouterLink,
    to: path,
  };

  return (
    <ListItemStyle
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
      {...listItem}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
};

export default NavItem;
