import Container from '@material-ui/core/Container';
import Stack from '@material-ui/core/Stack';
import { styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LoginForm from 'components/authentication/login/LoginForm';
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

const Login = (): ReactElement => {
  return (
    <RootStyle title="Armería | Iniciar sesión">
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Inicio de sesión
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Digite sus datos de acceso para iniciar sesión.
            </Typography>
          </Stack>

          <LoginForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default Login;
