import Stack from '@material-ui/core/Stack';
import TextField from '@material-ui/core/TextField';
import { LoadingButton } from '@material-ui/lab';
import ApiErrors from 'components/feedback/ApiErrors';
import Consola from 'consola';
import { Form, FormikProvider, useFormik } from 'formik';
import { CreateAmmunitionRequest } from 'modules/armament/ammunition/Models';
import { createAmmunition } from 'modules/armament/ammunition/Service';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const AmmunitionForm = (): ReactElement => {
  const RegisterAmmunitionSchema = Yup.object().shape({
    code: Yup.string().required('Este campo es requerido'),
    type: Yup.string().required('Este campo es requerido'),
    mark: Yup.string().required('Este campo es requerido'),
    caliber: Yup.string().required('Este campo es requerido'),
    series: Yup.string().required('Este campo es requerido'),
    lot: Yup.string().required('Este campo es requerido'),
    quantityAvailable: Yup.number().required('Este campo es requerido'),
  });

  const navigate = useNavigate();
  const formik = useFormik<CreateAmmunitionRequest>({
    initialValues: {
      code: '',
      type: '',
      mark: '',
      caliber: '',
      series: '',
      lot: '',
      quantityAvailable: 0,
    },
    validationSchema: RegisterAmmunitionSchema,
    onSubmit: async values => {
      try {
        await createAmmunition(values);
        navigate('/dashboard/ammunition/all');
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
                : 'Digite el código de la munición'
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
                : 'Digite el tipo de la munición'
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
                : 'Digite la marca de la munición'
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
                : 'Digite el calibre de la munición'
            }
            error={!!(errors.caliber && touched.caliber)}
            disabled={isSubmitting}
            {...getFieldProps('caliber')}
            fullWidth
          />
          <TextField
            label="Número de serie"
            helperText={
              errors.series && touched.series
                ? errors.series
                : 'Digite el número de serie de la munición'
            }
            error={!!(errors.series && touched.series)}
            disabled={isSubmitting}
            {...getFieldProps('series')}
            fullWidth
          />
          <TextField
            label="Lote"
            helperText={
              errors.mark && touched.mark
                ? errors.mark
                : 'Digite el lote de la munición'
            }
            error={!!(errors.lot && touched.lot)}
            disabled={isSubmitting}
            {...getFieldProps('lot')}
            fullWidth
          />
          <TextField
            label="Cantidad disponible"
            helperText={
              errors.quantityAvailable && touched.quantityAvailable
                ? errors.quantityAvailable
                : 'Digite la cantidad disponible de la munición'
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
            Registrar munición
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default AmmunitionForm;
