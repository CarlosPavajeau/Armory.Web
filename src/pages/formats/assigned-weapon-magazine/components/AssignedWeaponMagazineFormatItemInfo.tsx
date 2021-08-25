import { ReactElement } from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { AssignedWeaponMagazineFormatItem } from 'modules/formats/assigned-weapon-magazine/Models';

const styles = createStyles({
  text: {
    display: 'block',
  },
});

export interface AssignedWeaponMagazineFormatItemInfoProps
  extends WithStyles<typeof styles> {
  item: AssignedWeaponMagazineFormatItem;
}

const AssignedWeaponMagazineFormatItemInfo = (
  props: AssignedWeaponMagazineFormatItemInfoProps,
): ReactElement => {
  const { classes, item } = props;

  return (
    <>
      <Typography variant="subtitle2" className={classes.text}>
        Catidad munición: {item.ammunitionQuantity}
      </Typography>
      <Typography variant="subtitle2" className={classes.text}>
        Lote munición: {item.ammunitionLot}
      </Typography>
      <Typography variant="subtitle2" className={classes.text}>
        Cartucho de la vida: {item.cartridgeOfLife ? 'Sí' : 'Nó'}
      </Typography>
      <Typography variant="subtitle2" className={classes.text}>
        Verificado en físico: {item.verifiedInPhysical ? 'Sí' : 'Nó'}
      </Typography>
      <Typography variant="subtitle2" className={classes.text}>
        Novedad: {item.novelty ? 'Sí' : 'Nó'}
      </Typography>
      <Typography variant="subtitle2" className={classes.text}>
        Observaciones: {item.observations}
      </Typography>
    </>
  );
};

export default withStyles(styles)(AssignedWeaponMagazineFormatItemInfo);
