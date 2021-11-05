import EditIcon from '@mui/icons-material/Edit';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import MoreMenu from 'components/menu/MoreMenu';
import { ReactElement } from 'react';

interface PersonMoreMenuProps {
  personId: string;
  onChangePersonDegreeClick: (personId: string) => void;
}

const PersonMoreMenu = (props: PersonMoreMenuProps): ReactElement => {
  const { personId, onChangePersonDegreeClick } = props;

  const handleChangePersonDegreeClick = () => {
    onChangePersonDegreeClick(personId);
  };

  return (
    <MoreMenu>
      <MenuItem onClick={handleChangePersonDegreeClick}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText
          primary="Editar cargo de operaciones y grado"
          primaryTypographyProps={{ variant: 'body2' }}
        />
      </MenuItem>
    </MoreMenu>
  );
};

export default PersonMoreMenu;
