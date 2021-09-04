import Container from '@material-ui/core/Container';
import Stack from '@material-ui/core/Stack';
import Typography from '@material-ui/core/Typography';
import AssignedWeaponMagazineFormatForm from 'components/dashboard/formats/assigned-weapon-magazine/AssignedWeaponMagazineFormatForm';
import Page from 'components/Page';
import { ReactElement } from 'react';

const RegisterAssignedWeaponMagazineFormat = (): ReactElement => {
  return (
    <Page title="Armería | Registro de formato de revista">
      <Container>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Registro de formato de revista
          </Typography>
        </Stack>

        <AssignedWeaponMagazineFormatForm />
      </Container>
    </Page>
  );
};

export default RegisterAssignedWeaponMagazineFormat;
