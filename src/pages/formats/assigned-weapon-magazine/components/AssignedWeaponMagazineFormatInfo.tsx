import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/styles';
import withStyles from '@material-ui/styles/withStyles';
import { useAppSelector } from 'common/hooks';
import { formStyles } from 'common/styles';
import { selectCurrentFormat } from 'modules/formats/assigned-weapon-magazine/Slice';
import { Warehouse } from 'modules/formats/war-material-and-special-equipment-assignment/Models';
import moment from 'moment';
import { ReactElement } from 'react';

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
        Formato No. {format && format.id}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Código: {format && format?.code}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Fecha: {format && moment(format.date).format('L')}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Vigencia: {format && moment(format.validity).format('L')}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Unidad: {format && format?.squadronCode}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Dependencia o escuadron: {format && format?.squadCode}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Alamacén de armamento:{' '}
        {format && format?.warehouse === Warehouse.Air ? 'Aéreo ' : 'Terrestre'}
      </Typography>
    </Paper>
  );
};

export default withStyles(formStyles)(AssignedWeaponMagazineFormatInfo);
