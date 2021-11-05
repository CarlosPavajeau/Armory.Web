import EditIcon from '@mui/icons-material/Edit';
import { ListItemIcon, ListItemText } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import ChangeFlightCommanderDialog from 'components/dashboard/flights/ChangeFlightCommanderDialog';
import MoreMenu from 'components/menu/MoreMenu';
import { ReactElement, useState } from 'react';

interface FlightsMoreMenuProps {
  flightCode: string;
}

const FlightsMoreMenu = (props: FlightsMoreMenuProps): ReactElement => {
  const { flightCode } = props;
  const [isOpenChangeFlightCommander, setIsOpenChangeFlightCommander] =
    useState(false);

  const handleOnCloseChangeFlightCommander = () => {
    setIsOpenChangeFlightCommander(false);
  };

  return (
    <>
      <MoreMenu>
        <MenuItem onClick={() => setIsOpenChangeFlightCommander(true)}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText
            primary="Cambiar comandante"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </MoreMenu>

      <ChangeFlightCommanderDialog
        open={isOpenChangeFlightCommander}
        flightCode={flightCode}
        onClose={handleOnCloseChangeFlightCommander}
      />
    </>
  );
};

export default FlightsMoreMenu;
