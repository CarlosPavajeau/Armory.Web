import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ApiErrors from 'components/feedback/ApiErrors';
import SelectFlightField from 'components/forms/SelectFlightField';
import Consola from 'consola';
import { Form, FormikProvider, useFormik } from 'formik';
import { CreateExplosiveRequest } from 'modules/armament/explosives/models';
import { createExplosive } from 'modules/armament/explosives/service';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const ExplosiveForm = (): ReactElement => {
  const RegisterExplosiveSchema = Yup.object().shape({
    serial: Yup.string().required('Este campo es requerido'),
    type: Yup.string().required('Este campo es requerido'),
    mark: Yup.string().required('Este campo es requerido'),
    caliber: Yup.string().required('Este campo es requerido'),
    lot: Yup.string().required('Este campo es requerido'),
    quantityAvailable: Yup.number()
      .required('Este campo es requerido')
      .min(1, 'Este campo es requerido'),
    flightCode: Yup.string().required('Este campo es requerido'),
  });

  const navigate = useNavigate();
  const formik = useFormik<CreateExplosiveRequest>({
    initialValues: {
      serial: '',
      type: '',
      mark: '',
      caliber: '',
      lot: '',
      quantityAvailable: 0,
      flightCode: '',
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
            label="Número de serie"
            helperText={
              errors.serial && touched.serial
                ? errors.serial
                : 'Digite el número de serie del explosivo'
            }
            error={!!(errors.serial && touched.serial)}
            disabled={isSubmitting}
            {...getFieldProps('serial')}
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

          <SelectFlightField
            disabled={isSubmitting}
            {...getFieldProps('flightCode')}
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
