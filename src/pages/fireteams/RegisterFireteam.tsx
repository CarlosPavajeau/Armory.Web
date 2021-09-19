import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FireteamForm from 'components/dashboard/fireteams/FireteamForm';
import Page from 'components/Page';
import React, { ReactElement } from 'react';

const RegisterFireteam = (): ReactElement => {
  return (
    <Page title="Armería | Registro de escuadras">
      <Container>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Registro de escuadras
          </Typography>
        </Stack>

        <FireteamForm />
      </Container>
    </Page>
  );
};

export default RegisterFireteam;
