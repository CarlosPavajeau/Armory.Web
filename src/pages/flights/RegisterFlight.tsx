import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FlightForm from 'components/dashboard/flights/FlightForm';
import Page from 'components/Page';
import { ReactElement } from 'react';

const RegisterFlight = (): ReactElement => {
  return (
    <Page title="Armería | Registro de escuadrillas">
      <Container>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Registro de escuadrillas
          </Typography>
        </Stack>

        <FlightForm />
      </Container>
    </Page>
  );
};

export default RegisterFlight;
