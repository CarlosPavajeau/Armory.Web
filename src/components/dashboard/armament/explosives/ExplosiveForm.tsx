import Stack from '@material-ui/core/Stack';
import TextField from '@material-ui/core/TextField';
import { LoadingButton } from '@material-ui/lab';
import ApiErrors from 'components/feedback/ApiErrors';
import Consola from 'consola';
import { Form, FormikProvider, useFormik } from 'formik';
import { CreateExplosiveRequest } from 'modules/armament/explosives/Models';
import { createExplosive } from 'modules/armament/explosives/Service';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const ExplosiveForm = (): ReactElement => {
  const RegisterExplosiveSchema = Yup.object().shape({
    code: Yup.string().required('Este campo es requerido'),
    type: Yup.string().required('Este campo es requerido'),
    mark: Yup.string().required('Este campo es requerido'),
    caliber: Yup.string().required('Este campo es requerido'),
    lot: Yup.string().required('Este campo es requerido'),
    series: Yup.string().required('Este campo es requerido'),
    quantityAvailable: Yup.number()
      .required('Este campo es requerido')
      .min(1, 'Este campo es requerido'),
  });

  const navigate = useNavigate();
  const formik = useFormik<CreateExplosiveRequest>({
    initialValues: {
      code: '',
      type: '',
      mark: '',
      caliber: '',
      lot: '',
      series: '',
      quantityAvailable: 0,
    },
    validationSchema: RegisterExplosiveSchema,
    onSubmit: async values => {
      try {
        await createExplosive(values);
        navigate('/dashboard/explosives/all');
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
            label="Código"
            helperText={
              errors.code && touched.code
                ? errors.code
                : 'Digite el código del explosivo'
            }
            error={!!(errors.code && touched.code)}
            disabled={isSubmitting}
            {...getFieldProps('code')}
            fullWidth
          />
          <TextField
            label="Tipo"
            helperText={
              errors.type && touched.type
                ? errors.type
                : 'Digite el tipo del explosivo'
            }
            error={!!(errors.type && touched.type)}
            disabled={isSubmitting}
            {...getFieldProps('type')}
            fullWidth
          />
          <TextField
            label="Marca"
            helperText={
              errors.mark && touched.mark
                ? errors.mark
                : 'Digite la marca del explosivo'
            }
            error={!!(errors.mark && touched.mark)}
            disabled={isSubmitting}
            {...getFieldProps('mark')}
            fullWidth
          />
          <TextField
            label="Calibre"
            helperText={
              errors.caliber && touched.caliber
                ? errors.caliber
                : 'Digite el calibre del explosivo'
            }
            error={!!(errors.caliber && touched.caliber)}
            disabled={isSubmitting}
            {...getFieldProps('caliber')}
            fullWidth
          />
          <TextField
            label="Lote"
            helperText={
              errors.lot && touched.lot
                ? errors.lot
                : 'Digite el lote del explosivo'
            }
            error={!!(errors.lot && touched.lot)}
            disabled={isSubmitting}
            {...getFieldProps('lot')}
            fullWidth
          />
          <TextField
            label="Número de serie"
            helperText={
              errors.series && touched.series
                ? errors.series
                : 'Digite el número de serie del explosivo'
            }
            error={!!(errors.series && touched.series)}
            disabled={isSubmitting}
            {...getFieldProps('series')}
            fullWidth
          />
          <TextField
            label="Cantidad disponible"
            helperText={
              errors.quantityAvailable && touched.quantityAvailable
                ? errors.quantityAvailable
                : 'Digite la cantidad disponible del explosivo'
            }
            error={!!(errors.quantityAvailable && touched.quantityAvailable)}
            disabled={isSubmitting}
            {...getFieldProps('quantityAvailable')}
            fullWidth
          />

          <ApiErrors />

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Registrar explosivo
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default ExplosiveForm;
