import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, ListItem, ListItemText, Tooltip } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { AmmunitionAndQuantities } from 'modules/formats/war-material-delivery-certificate/Models';
import { Fragment, ReactElement } from 'react';

interface AmmunitionInfoProps {
  ammunition: AmmunitionAndQuantities;
  onDeleteAmmunition: (ammunitionToDelete: string) => void;
}

const AmmunitionInfo = (props: AmmunitionInfoProps): ReactElement => {
  const { ammunition, onDeleteAmmunition } = props;

  return (
    <>
      {ammunition.length > 0 && (
        <List key="ammunition-list">
          {ammunition.map(ammunitionAndQuantity => {
            const { ammunitionLot, quantity } = ammunitionAndQuantity;
            return (
              <Fragment key={ammunitionLot}>
                <ListItem
                  key={ammunitionLot}
                  secondaryAction={
                    <Tooltip title="Eliminar registro">
                      <IconButton
                        edge="end"
                        onClick={() => onDeleteAmmunition(ammunitionLot)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemText
                    primary={`Lote munición: ${ammunitionLot}`}
                    secondary={`Cantidad: ${quantity}`}
                  />
                </ListItem>
                <Divider component="li" />
              </Fragment>
            );
          })}
        </List>
      )}
      {ammunition.length === 0 && (
        <Alert severity="info">No se ha seleccionado ninguna munición.</Alert>
      )}
    </>
  );
};

export default AmmunitionInfo;
