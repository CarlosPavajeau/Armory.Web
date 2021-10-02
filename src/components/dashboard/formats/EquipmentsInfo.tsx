import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, ListItem, ListItemText, Tooltip } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { EquipmentsAndQuantities } from 'modules/formats/war-material-delivery-certificate/Models';
import { Fragment, ReactElement } from 'react';

interface EquipmentsInfoProps {
  equipments: EquipmentsAndQuantities;
  onDeleteEquipment: (equipmentSerial: string) => void;
}

const EquipmentsInfo = (props: EquipmentsInfoProps): ReactElement => {
  const { equipments, onDeleteEquipment } = props;

  return (
    <>
      {equipments.length > 0 && (
        <List key="equipments-list">
          {equipments.map(equipmentAndQuantity => {
            const { equipmentSerial, quantity } = equipmentAndQuantity;

            return (
              <Fragment key={equipmentSerial}>
                <ListItem
                  key={equipmentSerial}
                  secondaryAction={
                    <Tooltip title="Eliminar registro">
                      <IconButton
                        edge="end"
                        onClick={() => onDeleteEquipment(equipmentSerial)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemText
                    primary={`Serial equipo: ${equipmentSerial}`}
                    secondary={`Cantidad: ${quantity}`}
                  />
                </ListItem>
                <Divider component="li" />
              </Fragment>
            );
          })}
        </List>
      )}
      {equipments.length === 0 && (
        <Alert severity="info">
          No se ha seleccionado ningún equipo especial o accesorio.
        </Alert>
      )}
    </>
  );
};

export default EquipmentsInfo;
