import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EquipmentForm from 'components/dashboard/armament/equipments/EquipmentForm';
import Page from 'components/Page';
import React, { ReactElement } from 'react';

const RegisterEquipment = (): ReactElement => {
  return (
    <Page title="Armería | Registro de equipo especial y accesorios">
      <Container>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Registro de equipo especial y accesorios
          </Typography>
        </Stack>

        <EquipmentForm />
      </Container>
    </Page>
  );
};

export default RegisterEquipment;
