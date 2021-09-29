import { Card, CardContent } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Weapon } from 'modules/armament/weapons/models';
import { ReactElement } from 'react';

interface AssignedWeaponMagazineFormatWeaponInfoProps {
  weapon: Weapon | null;
}

const AssignedWeaponMagazineFormatWeaponInfo = (
  props: AssignedWeaponMagazineFormatWeaponInfoProps,
): ReactElement => {
  const { weapon } = props;
  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Stack>
          <Typography variant="h5" gutterBottom>
            Arma a verificar
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Número de serie: {weapon && weapon.serial}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Tipo: {weapon && weapon.type}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Calibre: {weapon && weapon.caliber}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Asignada a: {weapon && `${weapon.ownerId} - ${weapon.ownerName}`}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AssignedWeaponMagazineFormatWeaponInfo;
