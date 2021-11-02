import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import ApiErrors from 'components/feedback/ApiErrors';
import SelectFireteamField from 'components/forms/SelectFireteamField';
import SelectFlightField from 'components/forms/SelectFlightField';
import SelectSquadField from 'components/forms/SelectSquadField';
import Consola from 'consola';
import { Form, FormikProvider, useFormik } from 'formik';
import { UpdateTroopFireTeamRequest } from 'modules/troopers/models';
import TroopersService from 'modules/troopers/service';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

interface ChangeTroopFireTeamFormProps {
  troopId: string;
}

interface ChangeTroopFireTeamFormValues extends UpdateTroopFireTeamRequest {
  squadCode: string;
  flightCode: string;
}

const ChangeTroopFireTeamForm = (
  props: ChangeTroopFireTeamFormProps,
): ReactElement => {
  const { troopId } = props;

  const ChangeTroopFireTeamSchema = Yup.object().shape({
    id: Yup.string().required('Este campo es requerido'),
    fireTeamCode: Yup.string().required('Este campo es requerido'),
    squadCode: Yup.string().required('Este campo es requerido'),
    flightCode: Yup.string().required('Este campo es requerido'),
  });

  const navigate = useNavigate();
  const formik = useFormik<ChangeTroopFireTeamFormValues>({
    initialValues: {
      id: troopId,
      squadCode: '',
      flightCode: '',
      fireTeamCode: '',
    },
    validationSchema: ChangeTroopFireTeamSchema,
    onSubmit: async value => {
      try {
        await TroopersService.updateFireTeam(value);
        navigate('/dashboard');
      } catch (err) {
        Consola.error(err);
      }
    },
  });

  const { handleSubmit, isSubmitting, getFieldProps, values } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <SelectSquadField
            disabled={isSubmitting}
            {...getFieldProps('squadCode')}
          />

          <SelectFlightField
            disabled={isSubmitting}
            {...getFieldProps('flightCode')}
          />

          <SelectFireteamField
            flightCode={values.flightCode}
            disabled={isSubmitting}
            {...getFieldProps('fireTeamCode')}
          />

          <ApiErrors />

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Actualizar
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default ChangeTroopFireTeamForm;
