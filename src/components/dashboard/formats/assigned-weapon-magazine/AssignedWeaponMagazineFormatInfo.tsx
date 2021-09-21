import { Card, CardContent } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
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
              Formato No. {format && format.code}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Fecha: {format && moment(format.date).format('L')}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Vigencia: {format && moment(format.validity).format('L')}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Escuadrilla: {format && format?.flightCode}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Escuadra: {format && format?.fireteamCode}
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
