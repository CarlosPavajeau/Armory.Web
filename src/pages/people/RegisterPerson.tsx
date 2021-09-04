import Container from '@material-ui/core/Container';
import Stack from '@material-ui/core/Stack';
import Typography from '@material-ui/core/Typography';
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
