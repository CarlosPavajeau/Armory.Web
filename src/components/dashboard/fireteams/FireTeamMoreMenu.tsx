import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ListItemIcon, ListItemText, Menu } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import ChangeFireTeamCommanderDialog from 'components/dashboard/fireteams/ChangeFireTeamCommanderDialog';
import { ReactElement, useRef, useState } from 'react';

interface FireTeamMoreMenuProps {
  fireTeamCode: string;
}

const FireTeamMoreMenu = (props: FireTeamMoreMenuProps): ReactElement => {
  const { fireTeamCode } = props;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenChangeFireTeamCommander, setIsOpenChangeFireTeamCommander] =
    useState(false);

  const handleOnCloseChangeFireTeamCommander = () => {
    setIsOpenChangeFireTeamCommander(false);
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
        <MenuItem onClick={() => setIsOpenChangeFireTeamCommander(true)}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText
            primary="Cambiar comandante"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>

        <ChangeFireTeamCommanderDialog
          open={isOpenChangeFireTeamCommander}
          fireTeamCode={fireTeamCode}
          onClose={handleOnCloseChangeFireTeamCommander}
        />
      </Menu>
    </>
  );
};

export default FireTeamMoreMenu;
