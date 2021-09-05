import { Card, CardContent } from '@material-ui/core';
import Stack from '@material-ui/core/Stack';
import Typography from '@material-ui/core/Typography';
import CircularLoader from 'components/loading/CircularLoader';
import { AssignedWeaponMagazineFormat } from 'modules/formats/assigned-weapon-magazine/Models';
import { AssignedWeaponMagazineFormatsUiStatus } from 'modules/formats/assigned-weapon-magazine/Slice';
import { Warehouse } from 'modules/formats/war-material-and-special-equipment-assignment/Models';
import moment from 'moment';
import { ReactElement } from 'react';

export interface AssignedWeaponMagazineFormatInfoProps {
  format: AssignedWeaponMagazineFormat | null;
  formatUiStatus: AssignedWeaponMagazineFormatsUiStatus;
}

const AssignedWeaponMagazineFormatInfo = (
  props: AssignedWeaponMagazineFormatInfoProps,
): ReactElement => {
  const { format, formatUiStatus } = props;

  return (
    <Card>
      <CardContent>
        {formatUiStatus === 'loading' && (
          <CircularLoader size={150} message="Cargando formato..." />
        )}
        {formatUiStatus !== 'loading' && (
          <Stack>
            <Typography variant="h4" gutterBottom>
              Registro de formato de revista
            </Typography>
            <Typography variant="h5">
              Formato No. {format && format.id}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Código: {format && format?.code}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Fecha: {format && moment(format.date).format('L')}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Vigencia: {format && moment(format.validity).format('L')}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Unidad: {format && format?.squadronCode}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Dependencia o escuadron: {format && format?.squadCode}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Alamacén de armamento:{' '}
              {format && format?.warehouse === Warehouse.Air
                ? 'Aéreo '
                : 'Terrestre'}
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default AssignedWeaponMagazineFormatInfo;
