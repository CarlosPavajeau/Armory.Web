import Container from '@material-ui/core/Container';
import Stack from '@material-ui/core/Stack';
import Typography from '@material-ui/core/Typography';
import RankForm from 'components/dashboard/ranks/RankForm';
import Page from 'components/Page';
import { ReactElement } from 'react';

const RegisterRank = (): ReactElement => {
  return (
    <Page title="Armería | Registro de cargos de operación">
      <Container>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Registro de cargos de operación
          </Typography>
        </Stack>

        <RankForm />
      </Container>
    </Page>
  );
};

export default RegisterRank;
