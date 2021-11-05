import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ForgottenPasswordForm from 'components/dashboard/users/ForgottenPasswordForm';
import Page from 'components/Page';
import { ReactElement } from 'react';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

const ForgottenPassword = (): ReactElement => {
  return (
    <RootStyle title="Armería | Contraseña olvidada">
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Contraseña olvidada
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Recupera tu contraseña de acceso en caso de que la hayas olvidado.
            </Typography>
          </Stack>

          <ForgottenPasswordForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default ForgottenPassword;
