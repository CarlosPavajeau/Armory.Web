import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import WarMaterialDeliveryCertificateFormatForm from 'components/dashboard/formats/war-material-delivery-certificate/WarMaterialDeliveryCertificateFormatForm';
import Page from 'components/Page';
import React, { ReactElement } from 'react';

const RegisterWarMaterialDeliveryCertificateFormat = (): ReactElement => {
  return (
    <Page title="Armería | Registrar formato de acta de entrega">
      <Container>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Registrar formato de acta de entrega
          </Typography>
        </Stack>

        <WarMaterialDeliveryCertificateFormatForm />
      </Container>
    </Page>
  );
};

export default RegisterWarMaterialDeliveryCertificateFormat;
