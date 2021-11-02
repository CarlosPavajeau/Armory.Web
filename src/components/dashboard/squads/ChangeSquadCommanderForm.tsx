import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import ApiErrors from 'components/feedback/ApiErrors';
import SelectCommanderField from 'components/forms/SelectCommanderField';
import Consola from 'consola';
import { Form, FormikProvider, useFormik } from 'formik';
import { UpdateSquadCommanderRequest } from 'modules/squads/models';
import SquadsService from 'modules/squads/service';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

interface ChangeSquadCommanderFormProps {
  squadCode: string;
}

const ChangeSquadCommanderForm = (
  props: ChangeSquadCommanderFormProps,
): ReactElement => {
  const { squadCode } = props;

  const ChangeSquadCommanderSchema = Yup.object().shape({
    code: Yup.string().required('Este campo es requerido'),
    personId: Yup.string().required('Este campo es requerido'),
  });

  const navigate = useNavigate();
  const formik = useFormik<UpdateSquadCommanderRequest>({
    initialValues: {
      code: squadCode,
      personId: '',
    },
    validationSchema: ChangeSquadCommanderSchema,
    onSubmit: async value => {
      try {
        await SquadsService.updateCommander(value);
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
            rankName="Comandante de Escuadrón"
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

export default ChangeSquadCommanderForm;
