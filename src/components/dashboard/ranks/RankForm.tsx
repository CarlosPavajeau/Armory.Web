import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useAppDispatch } from 'common/hooks';
import ApiErrors from 'components/feedback/ApiErrors';
import Consola from 'consola';
import { Form, FormikProvider, useFormik } from 'formik';
import { CreateRankRequest } from 'modules/ranks/models';
import { createRank } from 'modules/ranks/slice';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const RankForm = (): ReactElement => {
  const RegisterRankSchema = Yup.object().shape({
    name: Yup.string().required('Este campo es requerido'),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formik = useFormik<CreateRankRequest>({
    initialValues: {
      name: '',
    },
    validationSchema: RegisterRankSchema,
    onSubmit: async values => {
      try {
        dispatch(createRank(values));
        navigate('/dashboard/ranks/all');
      } catch (err: unknown) {
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
            placeholder="Ejemplo: Estudiante"
            helperText={
              errors.name && touched.name
                ? errors.name
                : 'Digite el nombre del cargo de operación'
            }
            error={!!(errors.name && touched.name)}
            disabled={isSubmitting}
            {...getFieldProps('name')}
            fullWidth
          />

          <ApiErrors />

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Registrar cargo de operación
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default RankForm;
