import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { noCase } from 'change-case';
import { ReactElement } from 'react';

export interface Notification {
  id: string;
  title: string;
  description: string;
  avatar: string | null;
  type: string;
}

const renderContent = (notification: Notification) => {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: 'text.secondary' }}
      >
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  return {
    avatar: <CircleNotificationsIcon />,
    title,
  };
};

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem = (props: NotificationItemProps): ReactElement => {
  const { notification } = props;
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={title} />
    </ListItemButton>
  );
};

export default NotificationItem;
