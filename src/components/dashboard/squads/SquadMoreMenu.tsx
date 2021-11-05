import EditIcon from '@mui/icons-material/Edit';
import { ListItemIcon, ListItemText } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import ChangeSquadCommanderDialog from 'components/dashboard/squads/ChangeSquadCommanderDialog';
import MoreMenu from 'components/menu/MoreMenu';
import { ReactElement, useState } from 'react';

interface SquadMoreMenuProps {
  squadCode: string;
}

const SquadMoreMenu = (props: SquadMoreMenuProps): ReactElement => {
  const { squadCode } = props;
  const [isOpenChangeSquadCommander, setIsOpenChangeSquadCommander] =
    useState(false);

  const handleOnCloseChangeSquadCommander = () => {
    setIsOpenChangeSquadCommander(false);
  };

  return (
    <>
      <MoreMenu>
        <MenuItem onClick={() => setIsOpenChangeSquadCommander(true)}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText
            primary="Cambiar comandante"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </MoreMenu>

      <ChangeSquadCommanderDialog
        open={isOpenChangeSquadCommander}
        squadCode={squadCode}
        onClose={handleOnCloseChangeSquadCommander}
      />
    </>
  );
};

export default SquadMoreMenu;
