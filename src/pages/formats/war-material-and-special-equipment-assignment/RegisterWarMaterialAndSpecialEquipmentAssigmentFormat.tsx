import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import WarMaterialAndSpecialEquipmentAssigmentFormatForm from 'components/dashboard/formats/war-material-and-special-equipment-assignment/WarMaterialAndSpecialEquipmentAssigmentFormatForm';
import Page from 'components/Page';
import React, { ReactElement } from 'react';

const RegisterWarMaterialAndSpecialEquipmentAssigmentFormat =
  (): ReactElement => {
    return (
      <Page title="Armería | Registrar formato de asignación">
        <Container>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Registro de formato de asignación
            </Typography>
          </Stack>

          <WarMaterialAndSpecialEquipmentAssigmentFormatForm />
        </Container>
      </Page>
    );
  };

export default RegisterWarMaterialAndSpecialEquipmentAssigmentFormat;
