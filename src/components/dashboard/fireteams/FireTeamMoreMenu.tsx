import EditIcon from '@mui/icons-material/Edit';
import { ListItemIcon, ListItemText } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import ChangeFireTeamCommanderDialog from 'components/dashboard/fireteams/ChangeFireTeamCommanderDialog';
import MoreMenu from 'components/menu/MoreMenu';
import { ReactElement, useState } from 'react';

interface FireTeamMoreMenuProps {
  fireTeamCode: string;
}

const FireTeamMoreMenu = (props: FireTeamMoreMenuProps): ReactElement => {
  const { fireTeamCode } = props;
  const [isOpenChangeFireTeamCommander, setIsOpenChangeFireTeamCommander] =
    useState(false);

  const handleOnCloseChangeFireTeamCommander = () => {
    setIsOpenChangeFireTeamCommander(false);
  };

  return (
    <>
      <MoreMenu>
        <MenuItem onClick={() => setIsOpenChangeFireTeamCommander(true)}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText
            primary="Cambiar comandante"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </MoreMenu>

      <ChangeFireTeamCommanderDialog
        open={isOpenChangeFireTeamCommander}
        fireTeamCode={fireTeamCode}
        onClose={handleOnCloseChangeFireTeamCommander}
      />
    </>
  );
};

export default FireTeamMoreMenu;
