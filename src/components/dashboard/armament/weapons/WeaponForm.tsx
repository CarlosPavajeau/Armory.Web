import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ApiErrors from 'components/feedback/ApiErrors';
import Consola from 'consola';
import FileSaver from 'file-saver';
import { Form, FormikProvider, useFormik } from 'formik';
import { CreateWeaponRequest } from 'modules/armament/weapons/Models';
import { createWeapon } from 'modules/armament/weapons/Service';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const WeaponForm = (): ReactElement => {
  const RegisterWeaponSchema = Yup.object().shape({
    code: Yup.string().required('Este campo es requerido'),
    type: Yup.string().required('Este campo es requerido'),
    mark: Yup.string().required('Este campo es requerido'),
    model: Yup.string().required('Este campo es requerido'),
    caliber: Yup.string().required('Este campo es requerido'),
    series: Yup.string().required('Este campo es requerido'),
    numberOfProviders: Yup.number()
      .required('Este campo es requerido')
      .min(1, 'Este campo es requerido'),
    providerCapacity: Yup.number()
      .required('Este campo es requerido')
      .min(1, 'Este campo es requerido'),
  });

  const navigate = useNavigate();
  const formik = useFormik<CreateWeaponRequest>({
    initialValues: {
      code: '',
      type: '',
      mark: '',
      model: '',
      caliber: '',
      series: '',
      numberOfProviders: 0,
      providerCapacity: 0,
    },
    validationSchema: RegisterWeaponSchema,
    onSubmit: async values => {
      try {
        const result = await createWeapon(values);
        FileSaver.saveAs(result, `qr-${values.code}.pdf`);
        navigate('/dashboard/weapons/all');
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
                : 'Digite el código del arma'
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
                : 'Digite el tipo del arma'
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
                : 'Digite la marca del arma'
            }
            error={!!(errors.mark && touched.mark)}
            disabled={isSubmitting}
            {...getFieldProps('mark')}
            fullWidth
          />
          <TextField
            label="Modelo"
            helperText={
              errors.model && touched.model
                ? errors.model
                : 'Digite el modelo del arma'
            }
            error={!!(errors.model && touched.model)}
            disabled={isSubmitting}
            {...getFieldProps('model')}
            fullWidth
          />
          <TextField
            label="Calibre"
            helperText={
              errors.caliber && touched.caliber
                ? errors.caliber
                : 'Digite el calibre del arma'
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
                : 'Digite el número de serie del arma'
            }
            error={!!(errors.series && touched.series)}
            disabled={isSubmitting}
            {...getFieldProps('series')}
            fullWidth
          />
          <TextField
            label="Número de proveedores"
            helperText={
              errors.numberOfProviders && touched.numberOfProviders
                ? errors.numberOfProviders
                : 'Digite el numero de proveedores del arma'
            }
            error={!!(errors.numberOfProviders && touched.numberOfProviders)}
            disabled={isSubmitting}
            {...getFieldProps('numberOfProviders')}
            fullWidth
          />
          <TextField
            label="Capacidad del proveedor"
            helperText={
              errors.providerCapacity && touched.providerCapacity
                ? errors.providerCapacity
                : 'Digite la capacidad del proveedor del arma'
            }
            error={!!(errors.providerCapacity && touched.providerCapacity)}
            disabled={isSubmitting}
            {...getFieldProps('providerCapacity')}
            fullWidth
          />

          <ApiErrors />

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Registrar arma
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default WeaponForm;
