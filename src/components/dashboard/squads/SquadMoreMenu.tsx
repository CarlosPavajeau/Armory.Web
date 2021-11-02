import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ListItemIcon, ListItemText, Menu } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import ChangeSquadCommanderDialog from 'components/dashboard/squads/ChangeSquadCommanderDialog';
import { ReactElement, useRef, useState } from 'react';

interface SquadMoreMenuProps {
  squadCode: string;
}

const SquadMoreMenu = (props: SquadMoreMenuProps): ReactElement => {
  const { squadCode } = props;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenChangeSquadCommander, setIsOpenChangeSquadCommander] =
    useState(false);

  const handleOnCloseChangeSquadCommander = () => {
    setIsOpenChangeSquadCommander(false);
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
        <MenuItem onClick={() => setIsOpenChangeSquadCommander(true)}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText
            primary="Cambiar comandante"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </Menu>

      <ChangeSquadCommanderDialog
        open={isOpenChangeSquadCommander}
        squadCode={squadCode}
        onClose={handleOnCloseChangeSquadCommander}
      />
    </>
  );
};

export default SquadMoreMenu;
