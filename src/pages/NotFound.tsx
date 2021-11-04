import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Page from 'components/Page';
import { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

const NotFound = (): ReactElement => {
  return (
    <Page title="Armería | Página no encontrada">
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack spacing={7} justifyContent="space-between" alignItems="center">
            <Typography variant="h1" align="center">
              404 - Página no encontrada
            </Typography>
            <Stack spacing={3}>
              <Typography variant="subtitle1">
                La página solicitada no existe.
              </Typography>
              <Button size="large" component={RouterLink} to="/">
                Volver al inicio
              </Button>
            </Stack>
          </Stack>
        </ContentStyle>
      </Container>
    </Page>
  );
};

export default NotFound;
