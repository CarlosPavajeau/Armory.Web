import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ListItemIcon, ListItemText, Menu } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import ChangeTroopFireTeamDialog from 'components/dashboard/troopers/ChangeTroopFireTeamDialog';
import { ReactElement, useRef, useState } from 'react';

interface TroopMoreMenuProps {
  troopId: string;
}

const TroopMoreMenu = (props: TroopMoreMenuProps): ReactElement => {
  const { troopId } = props;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenChangeTroopFireTeam, setIsOpenChangeTroopFireTeam] =
    useState(false);

  const handleOnCloseChangeTroopFireTeam = () => {
    setIsOpenChangeTroopFireTeam(false);
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
        sx={{ p: 3 }}
      >
        <MenuItem onClick={() => setIsOpenChangeTroopFireTeam(true)}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>

          <ListItemText
            primary="Cambiar escuadra"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </Menu>

      <ChangeTroopFireTeamDialog
        open={isOpenChangeTroopFireTeam}
        troopId={troopId}
        onClose={handleOnCloseChangeTroopFireTeam}
      />
    </>
  );
};

export default TroopMoreMenu;
