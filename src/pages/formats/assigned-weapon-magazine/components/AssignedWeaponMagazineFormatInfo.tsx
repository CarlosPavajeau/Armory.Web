import { ReactElement } from 'react';
import { Paper, withStyles, WithStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { formStyles } from 'common/styles';
import { useAppSelector } from 'common/hooks';
import { selectCurrentFormat } from 'modules/formats/assigned-weapon-magazine/Slice';
import { Warehouse } from 'modules/formats/war-material-and-special-equipment-assignment/Models';

export type AssignedWeaponMagazineFormatInfoProps = WithStyles<
  typeof formStyles
>;

const AssignedWeaponMagazineFormatInfo = (
  props: AssignedWeaponMagazineFormatInfoProps,
): ReactElement => {
  const { classes } = props;
  const format = useAppSelector(selectCurrentFormat);

  return (
    <Paper className={classes.paper} elevation={0}>
      <Typography variant="subtitle2" color="textSecondary">
        Formato No. {format?.id}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Código: {format?.code}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Fecha: {format?.date.format('L')}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Vigencia: {format?.validity.format('L')}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Unidad: {format?.squadronCode}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Dependencia o escuadron: {format?.squadCode}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Alamacén de armamento:{' '}
        {format?.warehouse === Warehouse.Air ? 'Aéreo ' : 'Terrestre'}
      </Typography>
    </Paper>
  );
};

export default withStyles(formStyles)(AssignedWeaponMagazineFormatInfo);
