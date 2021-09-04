import Container from '@material-ui/core/Container';
import Stack from '@material-ui/core/Stack';
import Typography from '@material-ui/core/Typography';
import Page from 'components/Page';
import SquadForm from 'components/squads/SquadForm';
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
