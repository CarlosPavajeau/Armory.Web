import EditIcon from '@mui/icons-material/Edit';
import { ListItemIcon, ListItemText } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import ChangeTroopFireTeamDialog from 'components/dashboard/troopers/ChangeTroopFireTeamDialog';
import MoreMenu from 'components/menu/MoreMenu';
import { ReactElement, useState } from 'react';

interface TroopMoreMenuProps {
  troopId: string;
}

const TroopMoreMenu = (props: TroopMoreMenuProps): ReactElement => {
  const { troopId } = props;
  const [isOpenChangeTroopFireTeam, setIsOpenChangeTroopFireTeam] =
    useState(false);

  const handleOnCloseChangeTroopFireTeam = () => {
    setIsOpenChangeTroopFireTeam(false);
  };

  return (
    <>
      <MoreMenu>
        <MenuItem onClick={() => setIsOpenChangeTroopFireTeam(true)}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>

          <ListItemText
            primary="Cambiar escuadra"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </MoreMenu>

      <ChangeTroopFireTeamDialog
        open={isOpenChangeTroopFireTeam}
        troopId={troopId}
        onClose={handleOnCloseChangeTroopFireTeam}
      />
    </>
  );
};

export default TroopMoreMenu;
