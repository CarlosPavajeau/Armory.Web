import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import ApiErrors from 'components/feedback/ApiErrors';
import SelectCommanderField from 'components/forms/SelectCommanderField';
import Consola from 'consola';
import { Form, FormikProvider, useFormik } from 'formik';
import { UpdateFlightCommanderRequest } from 'modules/flights/models';
import FlightsService from 'modules/flights/service';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

interface ChangeFlightCommanderFormProps {
  flightCode: string;
}

const ChangeFlightCommanderForm = (
  props: ChangeFlightCommanderFormProps,
): ReactElement => {
  const { flightCode } = props;

  const ChangeFlightCommanderSchema = Yup.object().shape({
    code: Yup.string().required('Este campo es requeridol'),
    personId: Yup.string().required('Este campo es requerido'),
  });

  const navigate = useNavigate();
  const formik = useFormik<UpdateFlightCommanderRequest>({
    initialValues: {
      code: flightCode,
      personId: '',
    },
    validationSchema: ChangeFlightCommanderSchema,
    onSubmit: async value => {
      try {
        await FlightsService.updateCommander(value);
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
            rankName="Comandante de Escuadrilla"
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

export default ChangeFlightCommanderForm;
