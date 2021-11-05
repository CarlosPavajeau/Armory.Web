import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ResetPasswordForm from 'components/dashboard/users/ResetPasswordForm';
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

const ResetPassword = (): ReactElement => {
  return (
    <RootStyle title="Armería | Reestrablecer contraseña">
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Reestablecer contraseña
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Digita tu nueva contraeña
            </Typography>
          </Stack>

          <ResetPasswordForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default ResetPassword;
