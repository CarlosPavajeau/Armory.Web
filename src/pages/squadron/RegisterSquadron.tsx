import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SquadronForm from 'components/dashboard/squadrons/SquadronForm';
import Page from 'components/Page';
import { ReactElement } from 'react';

const RegisterSquadron = (): ReactElement => {
  return (
    <Page title="Armería | Registro de escuadrillas">
      <Container>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Registro de escuadrillas
          </Typography>
        </Stack>

        <SquadronForm />
      </Container>
    </Page>
  );
};

export default RegisterSquadron;
