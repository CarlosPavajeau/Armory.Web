import Container from '@material-ui/core/Container';
import Stack from '@material-ui/core/Stack';
import Typography from '@material-ui/core/Typography';
import AmmunitionForm from 'components/dashboard/armament/ammunition/AmmunitionForm';
import Page from 'components/Page';
import React, { ReactElement } from 'react';

const RegisterAmmunition = (): ReactElement => {
  return (
    <Page title="Armería | Registro de municiones">
      <Container>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Registro de municiones
          </Typography>
        </Stack>

        <AmmunitionForm />
      </Container>
    </Page>
  );
};

export default RegisterAmmunition;
