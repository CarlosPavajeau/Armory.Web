import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DegreeForm from 'components/dashboard/degrees/DegreeForm';
import Page from 'components/Page';
import React, { ReactElement } from 'react';

const RegisterDegree = (): ReactElement => {
  return (
    <Page title="Armería | Registro de grados">
      <Container>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Registro de grados
          </Typography>
        </Stack>

        <DegreeForm />
      </Container>
    </Page>
  );
};

export default RegisterDegree;
