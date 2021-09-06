import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ExplosiveForm from 'components/dashboard/armament/explosives/ExplosiveForm';
import Page from 'components/Page';
import React, { ReactElement } from 'react';

const RegisterExplosive = (): ReactElement => {
  return (
    <Page title="Armería | Registro de explosivos">
      <Container>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Registro de explosivos
          </Typography>
        </Stack>

        <ExplosiveForm />
      </Container>
    </Page>
  );
};

export default RegisterExplosive;
