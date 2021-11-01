import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import ApiErrors from 'components/feedback/ApiErrors';
import SelectCommanderField from 'components/forms/SelectCommanderField';
import Consola from 'consola';
import { Form, FormikProvider, useFormik } from 'formik';
import { UpdateFireTeamCommanderRequest } from 'modules/fireteams/models';
import FireTeamsService from 'modules/fireteams/service';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

interface ChangeFireTeamCommanderFormProps {
  fireTeamCode: string;
}

const ChangeFireTeamCommanderForm = (
  props: ChangeFireTeamCommanderFormProps,
): ReactElement => {
  const { fireTeamCode } = props;

  const ChangeFlightCommanderSchema = Yup.object().shape({
    code: Yup.string().required('Este campo es requerido'),
    personId: Yup.string().required('Este campo es requerido'),
  });

  const navigate = useNavigate();
  const formik = useFormik<UpdateFireTeamCommanderRequest>({
    initialValues: {
      code: fireTeamCode,
      personId: '',
    },
    validationSchema: ChangeFlightCommanderSchema,
    onSubmit: async value => {
      try {
        await FireTeamsService.updateCommander(value);
        navigate('/dashboard');
      } catch (err) {
        Consola.error(err);
      }
    },
  });

  const { handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <SelectCommanderField
            rankName="Comandante de Escuadra"
            disabled={isSubmitting}
            {...getFieldProps('personId')}
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

export default ChangeFireTeamCommanderForm;
