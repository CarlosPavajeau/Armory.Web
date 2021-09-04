import Container from '@material-ui/core/Container';
import Stack from '@material-ui/core/Stack';
import Typography from '@material-ui/core/Typography';
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
