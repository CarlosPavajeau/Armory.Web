import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, ListSubheader } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import MenuPopover from 'components/menu/MenuPopover';
import Scrollbar from 'components/scrollbar/Scrollbar';
import { ReactElement, useRef, useState } from 'react';

import NotificationItem, { Notification } from './NotificationItem';

const NOTIFICATIONS: Notification[] = [
  {
    id: '123',
    title: 'Prueba',
    description: 'Sin informacion',
    avatar: null,
    type: 'mail',
  },
  {
    id: '321',
    title: 'Prueba',
    description: 'Ninguna descripcion',
    avatar: null,
    type: 'mail',
  },
  {
    id: '5345',
    title: 'Prueba',
    description: 'Ninguna descripcion',
    avatar: null,
    type: 'mail',
  },
];

const NotificationsPopover = (): ReactElement => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [notifications] = useState(NOTIFICATIONS);

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
        size="large"
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: theme =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity,
              ),
          }),
        }}
      >
        <Badge badgeContent={2}>
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notificaciones</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Tiene {notifications.length} notificaciones
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: 'overline' }}
              >
                Nuevas
              </ListSubheader>
            }
          >
            {notifications.slice(0, 2).map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </List>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            Ver todas
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
};

export default NotificationsPopover;
