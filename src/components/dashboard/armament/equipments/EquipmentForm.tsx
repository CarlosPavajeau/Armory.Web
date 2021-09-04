import Stack from '@material-ui/core/Stack';
import TextField from '@material-ui/core/TextField';
import { LoadingButton } from '@material-ui/lab';
import ApiErrors from 'components/feedback/ApiErrors';
import Consola from 'consola';
import { Form, FormikProvider, useFormik } from 'formik';
import { CreateEquipmentRequest } from 'modules/armament/equipments/Models';
import { createEquipment } from 'modules/armament/equipments/Service';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const EquipmentForm = (): ReactElement => {
  const RegisterEquipmentSchema = Yup.object().shape({
    code: Yup.string().required('Este campo es requerido'),
    type: Yup.string().required('Este campo es requerido'),
    model: Yup.string().required('Este campo es requerido'),
    series: Yup.string().required('Este campo es requerido'),
    quantityAvailable: Yup.number()
      .required('Este campo es requerido')
      .min(1, 'Este campo es requerido'),
  });

  const navigate = useNavigate();
  const formik = useFormik<CreateEquipmentRequest>({
    initialValues: {
      code: '',
      type: '',
      model: '',
      series: '',
      quantityAvailable: 0,
    },
    validationSchema: RegisterEquipmentSchema,
    onSubmit: async values => {
      try {
        await createEquipment(values);
        navigate('/dashboard/equipments/all');
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
                : 'Digite el código del equipo especial o accesorio'
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
                : 'Digite el tipo del equipo especial o accesorio'
            }
            error={!!(errors.type && touched.type)}
            disabled={isSubmitting}
            {...getFieldProps('type')}
            fullWidth
          />
          <TextField
            label="Modelo"
            helperText={
              errors.model && touched.model
                ? errors.model
                : 'Digite el modelo del equipo especial o accesorio'
            }
            error={!!(errors.model && touched.model)}
            disabled={isSubmitting}
            {...getFieldProps('model')}
            fullWidth
          />
          <TextField
            label="Numero de serie"
            helperText={
              errors.series && touched.series
                ? errors.series
                : 'Digite el numero de serie del equipo especial o accesorio'
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
                : 'Digite la cantidad disponible del equipo especial o accesorio'
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
            Registrar equipo especial o accesorio
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default EquipmentForm;
