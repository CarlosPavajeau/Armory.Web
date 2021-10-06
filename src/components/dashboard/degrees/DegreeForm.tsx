import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useAppDispatch } from 'common/hooks';
import ApiErrors from 'components/feedback/ApiErrors';
import SelectRankField from 'components/forms/SelectRankField';
import Consola from 'consola';
import { Form, FormikProvider, useFormik } from 'formik';
import { CreateDegreeRequest } from 'modules/degrees/models';
import { createDegree } from 'modules/degrees/slice';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const DegreeForm = (): ReactElement => {
  const RegisterDegreeSchema = Yup.object().shape({
    name: Yup.string().required('Este campo es requerido'),
    rankId: Yup.number().required('Este campo es requerido'),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formik = useFormik<CreateDegreeRequest>({
    initialValues: {
      name: '',
      rankId: 0,
    },
    validationSchema: RegisterDegreeSchema,
    onSubmit: async values => {
      try {
        dispatch(createDegree(values));
        navigate('/dashboard/degrees/all');
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Nombre"
            placeholder="Ejemplo: Soldado"
            helperText={
              errors.name && touched.name
                ? errors.name
                : 'Digite el nombre del grado'
            }
            error={!!(errors.name && touched.name)}
            disabled={isSubmitting}
            {...getFieldProps('name')}
            fullWidth
          />

          <SelectRankField
            disabled={isSubmitting}
            {...getFieldProps('rankId')}
          />

          <ApiErrors />

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Registrar grado
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default DegreeForm;
