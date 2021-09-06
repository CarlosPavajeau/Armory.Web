import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PersonForm from 'components/dashboard/people/PersonForm';
import Page from 'components/Page';
import React, { ReactElement } from 'react';

const RegisterPerson = (): ReactElement => {
  return (
    <Page title="Armería | Registro de comandantes">
      <Container>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Registro de comandantes
          </Typography>
        </Stack>

        <PersonForm />
      </Container>
    </Page>
  );
};

export default RegisterPerson;
