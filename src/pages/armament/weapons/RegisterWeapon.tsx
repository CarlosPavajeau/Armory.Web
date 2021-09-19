import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import WeaponForm from 'components/dashboard/armament/weapons/WeaponForm';
import Page from 'components/Page';
import React, { ReactElement } from 'react';

const RegisterWeapon = (): ReactElement => {
  return (
    <Page title="Armería | Registro de armas">
      <Container>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Registro de armas
          </Typography>
        </Stack>

        <WeaponForm />
      </Container>
    </Page>
  );
};

export default RegisterWeapon;
