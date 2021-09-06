import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TroopForm from 'components/dashboard/troopers/TroopForm';
import Page from 'components/Page';
import React, { ReactElement } from 'react';

const RegisterTroop = (): ReactElement => {
  return (
    <Page title="Armería | Registro de cadetes, alumnos y soldados">
      <Container>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Registro de cadetes, alumnos y soldados
          </Typography>
        </Stack>

        <TroopForm />
      </Container>
    </Page>
  );
};

export default RegisterTroop;
