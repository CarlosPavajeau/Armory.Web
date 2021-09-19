import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { ReactElement, useRef, useState } from 'react';

interface PersonMoreMenuProps {
  personId: string;
  onChangePersonDegreeClick: (personId: string) => void;
}

const PersonMoreMenu = (props: PersonMoreMenuProps): ReactElement => {
  const { personId, onChangePersonDegreeClick } = props;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleChangePersonDegreeClick = () => {
    setIsOpen(false);
    onChangePersonDegreeClick(personId);
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
        PaperProps={{
          sx: { width: 350, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleChangePersonDegreeClick}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText
            primary="Editar cargo de operaciones y grado"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default PersonMoreMenu;
