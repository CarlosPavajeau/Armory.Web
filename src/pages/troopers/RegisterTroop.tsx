import Container from '@material-ui/core/Container';
import Stack from '@material-ui/core/Stack';
import Typography from '@material-ui/core/Typography';
import Page from 'components/Page';
import TroopForm from 'components/troopers/TroopForm';
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
