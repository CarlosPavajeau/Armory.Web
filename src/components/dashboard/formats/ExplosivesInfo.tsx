import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, ListItem, ListItemText, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { ExplosivesAndQuantities } from 'modules/formats/war-material-delivery-certificate/Models';
import { Fragment, ReactElement } from 'react';

interface ExplosivesInfoProps {
  explosives: ExplosivesAndQuantities;
  onDeleteExplosive: (explosiveToDelete: string) => void;
}

const ExplosivesInfo = (props: ExplosivesInfoProps): ReactElement => {
  const { explosives, onDeleteExplosive } = props;

  return (
    <>
      {explosives.length > 0 && (
        <List key="explosives-list">
          {explosives.map(explosiveAndQuantity => {
            const { explosiveSerial, quantity } = explosiveAndQuantity;

            return (
              <Fragment key={explosiveSerial}>
                <ListItem
                  key={explosiveSerial}
                  secondaryAction={
                    <Tooltip title="Eliminar registro">
                      <IconButton
                        edge="end"
                        onClick={() => onDeleteExplosive(explosiveSerial)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemText
                    primary={`Serial explosivo: ${explosiveSerial}`}
                    secondary={`Cantidad: ${quantity}`}
                  />
                </ListItem>
              </Fragment>
            );
          })}
        </List>
      )}
      {explosives.length === 0 && (
        <Alert severity="info">No se ha seleccionado ningún explosivo.</Alert>
      )}
    </>
  );
};

export default ExplosivesInfo;
