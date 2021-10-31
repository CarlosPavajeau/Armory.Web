import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ListItemIcon, ListItemText, Menu } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import ChangeFlightCommanderDialog from 'components/dashboard/flights/ChangeFlightCommanderDialog';
import { ReactElement, useRef, useState } from 'react';

interface FlightsMoreMenuProps {
  flightCode: string;
}

const FlightsMoreMenu = (props: FlightsMoreMenuProps): ReactElement => {
  const { flightCode } = props;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenChangeFlightCommander, setIsOpenChangeFlightCommander] =
    useState(false);

  const handleOnCloseChangeFlightCommander = () => {
    setIsOpenChangeFlightCommander(false);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
      >
        <MenuItem onClick={() => setIsOpenChangeFlightCommander(true)}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText
            primary="Cambiar comandante"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </Menu>

      <ChangeFlightCommanderDialog
        open={isOpenChangeFlightCommander}
        flightCode={flightCode}
        onClose={handleOnCloseChangeFlightCommander}
      />
    </>
  );
};

export default FlightsMoreMenu;
