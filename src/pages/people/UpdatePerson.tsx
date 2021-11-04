import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import UpdatePersonForm from 'components/dashboard/people/UpdatePersonForm';
import Page from 'components/Page';
import { ReactElement } from 'react';

const UpdatePerson = (): ReactElement => {
  return (
    <Page title="Armería | Cambio de datos personales">
      <Container>
        <Stack sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Cambiar datos personales
          </Typography>
        </Stack>

        <UpdatePersonForm />
      </Container>
    </Page>
  );
};

export default UpdatePerson;
