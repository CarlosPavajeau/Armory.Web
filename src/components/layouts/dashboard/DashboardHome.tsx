import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

const ImageStyle = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    height: 350,
    width: 350,
  },
}));

const DashboardHome = (): ReactElement => {
  return (
    <Container maxWidth="md">
      <Stack spacing={5} alignItems="center" alignContent="center">
        <Typography variant="h3" align="center">
          Bienvenido
        </Typography>

        <ImageStyle src="/static/illustrations/GACAR.png" alt="GACAR" />
      </Stack>
    </Container>
  );
};

export default DashboardHome;
