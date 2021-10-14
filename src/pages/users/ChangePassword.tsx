import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChangePasswordForm from 'components/dashboard/users/ChangePasswordForm';
import Page from 'components/Page';
import { ReactElement } from 'react';

const ChangePassword = (): ReactElement => {
  return (
    <Page title="Armeria | Cambio de contraseña">
      <Container>
        <Stack sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Cambiar contraseña
          </Typography>
        </Stack>

        <ChangePasswordForm />
      </Container>
    </Page>
  );
};

export default ChangePassword;
