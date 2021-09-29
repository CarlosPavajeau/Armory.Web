import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ApiErrors from 'components/feedback/ApiErrors';
import SelectFlightField from 'components/forms/SelectFlightField';
import Consola from 'consola';
import FileSaver from 'file-saver';
import { Form, FormikProvider, useFormik } from 'formik';
import { CreateWeaponRequest } from 'modules/armament/weapons/models';
import { createWeapon } from 'modules/armament/weapons/service';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const WeaponForm = (): ReactElement => {
  const RegisterWeaponSchema = Yup.object().shape({
    serial: Yup.string().required('Este campo es requerido'),
    type: Yup.string().required('Este campo es requerido'),
    mark: Yup.string().required('Este campo es requerido'),
    model: Yup.string().required('Este campo es requerido'),
    caliber: Yup.string().required('Este campo es requerido'),
    numberOfProviders: Yup.number()
      .required('Este campo es requerido')
      .min(1, 'Este campo es requerido'),
    providerCapacity: Yup.number()
      .required('Este campo es requerido')
      .min(1, 'Este campo es requerido'),
    flightCode: Yup.string().required('Este campo es requerido'),
  });

  const navigate = useNavigate();
  const formik = useFormik<CreateWeaponRequest>({
    initialValues: {
      serial: '',
      type: '',
      mark: '',
      model: '',
      caliber: '',
      numberOfProviders: 0,
      providerCapacity: 0,
      flightCode: '',
    },
    validationSchema: RegisterWeaponSchema,
    onSubmit: async values => {
      try {
        const result = await createWeapon(values);
        FileSaver.saveAs(result, `qr-${values.serial}.pdf`);
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
            label="Número de serie"
            helperText={
              errors.serial && touched.serial
                ? errors.serial
                : 'Digite el número de serie del arma'
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
            Registrar arma
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default WeaponForm;
