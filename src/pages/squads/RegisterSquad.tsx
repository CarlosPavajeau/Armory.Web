import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SquadForm from 'components/dashboard/squads/SquadForm';
import Page from 'components/Page';
import React, { ReactElement } from 'react';

const RegisterSquad = (): ReactElement => {
  return (
    <Page title="Armería | Registro de escuadras">
      <Container>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Registro de escuadras
          </Typography>
        </Stack>

        <SquadForm />
      </Container>
    </Page>
  );
};

export default RegisterSquad;
