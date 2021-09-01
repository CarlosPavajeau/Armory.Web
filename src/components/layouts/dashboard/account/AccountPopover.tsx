import { Avatar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import { alpha } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuPopover from 'components/menu/MenuPopover';
import { ReactElement, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface MenuOption {
  label: string;
  icon: ReactElement;
  linkTo: string;
}

const MENU_OPTIONS: MenuOption[] = [
  { label: 'Inicio', icon: <HomeIcon />, linkTo: '/' },
  { label: 'Perfil', icon: <PersonIcon />, linkTo: '#' },
  { label: 'Configuraciones', icon: <SettingsIcon />, linkTo: '#' },
];

const AccountPopover = (): ReactElement => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: theme => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar sx={{ bgcolor: 'primary.main' }}>A</Avatar>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            Usuario armería
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            armeria@arm.com
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map(option => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            >
              {option.icon}
            </Box>

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined">
            Cerrar sesión
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
};

export default AccountPopover;