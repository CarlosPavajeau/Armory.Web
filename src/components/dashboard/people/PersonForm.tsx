import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ApiErrors from 'components/feedback/ApiErrors';
import SelectDegreeField from 'components/forms/SelectDegreeField';
import SelectRankField from 'components/forms/SelectRankField';
import Consola from 'consola';
import { Form, FormikProvider, useFormik } from 'formik';
import { CreatePersonRequest } from 'modules/people/models';
import PeopleService from 'modules/people/service';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

interface PersonFormValues extends CreatePersonRequest {
  rankId: number;
}

const PersonForm = (): ReactElement => {
  const RegisterPersonScheme = Yup.object().shape({
    id: Yup.string()
      .required('Este campo es requerido')
      .max(10, 'No se permiten más de 10 caracteres'),
    firstName: Yup.string().required('Este campo es requerido'),
    secondName: Yup.string().required('Este campo es requerido'),
    lastName: Yup.string().required('Este campo es requerido'),
    secondLastName: Yup.string().required('Este campo es requerido'),
    email: Yup.string()
      .required('Este campo es requerido')
      .email('Digite un email válido'),
    phoneNumber: Yup.string()
      .required('Este campo es requerido')
      .min(10, 'Se deben digitar mínimo 10 caracteres')
      .max(10, 'No se permiten más de 10 caracteres'),
    degreeId: Yup.number()
      .required('Este campo es requerido')
      .min(1, 'Este campo es requerido'),
    rankId: Yup.number()
      .required('Este campo es requerido')
      .min(1, 'Este campo es requerido'),
  });

  const navigate = useNavigate();
  const formik = useFormik<PersonFormValues>({
    initialValues: {
      id: '',
      firstName: '',
      secondName: '',
      lastName: '',
      secondLastName: '',
      email: '',
      phoneNumber: '',
      degreeId: 0,
      rankId: 0,
    },
    validationSchema: RegisterPersonScheme,
    onSubmit: async values => {
      try {
        await PeopleService.createPerson(values);
        navigate('/dashboard/people/all');
      } catch (err: unknown) {
        Consola.error(err);
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Identificación"
            placeholder="Ejemplo: 1234567890"
            helperText={
              errors.id && touched.id
                ? errors.id
                : 'Digite la identificación del comandante'
            }
            error={!!(errors.id && touched.id)}
            disabled={isSubmitting}
            {...getFieldProps('id')}
            required
            fullWidth
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Primer nombre"
              placeholder="Ejemplo: Manolo"
              helperText={
                errors.firstName && touched.firstName
                  ? errors.firstName
                  : 'Digite el primer nombre del comandante'
              }
              error={!!(errors.firstName && touched.firstName)}
              disabled={isSubmitting}
              {...getFieldProps('firstName')}
              required
              fullWidth
            />
            <TextField
              label="Segundo nombre"
              placeholder="Ejemplo: Juan"
              helperText={
                errors.secondName && touched.secondName
                  ? errors.secondName
                  : 'Digite el segundo nombre del comandante'
              }
              error={!!(errors.secondName && touched.secondName)}
              disabled={isSubmitting}
              {...getFieldProps('secondName')}
              fullWidth
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Primer apellido"
              placeholder="Ejemplo: Peréz"
              helperText={
                errors.lastName && touched.lastName
                  ? errors.lastName
                  : 'Digite el primer apellido del comandante'
              }
              error={!!(errors.lastName && touched.lastName)}
              disabled={isSubmitting}
              {...getFieldProps('lastName')}
              required
              fullWidth
            />
            <TextField
              label="Segundo apellido"
              placeholder="Ejemplo: Torres"
              helperText={
                errors.secondLastName && touched.secondLastName
                  ? errors.secondLastName
                  : 'Digite el segundo apellido del comandante'
              }
              error={!!(errors.secondLastName && touched.secondLastName)}
              disabled={isSubmitting}
              {...getFieldProps('secondLastName')}
              fullWidth
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Email"
              placeholder="example@example.com"
              helperText={
                errors.email && touched.email
                  ? errors.email
                  : 'Digite el email del comandante'
              }
              error={!!(errors.email && touched.email)}
              disabled={isSubmitting}
              {...getFieldProps('email')}
              fullWidth
            />
            <TextField
              label="Número de teléfono"
              placeholder="3000000000"
              helperText={
                errors.phoneNumber && touched.phoneNumber
                  ? errors.phoneNumber
                  : 'Digite el número de teléfono del comandante'
              }
              error={!!(errors.phoneNumber && touched.phoneNumber)}
              disabled={isSubmitting}
              {...getFieldProps('phoneNumber')}
              fullWidth
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <SelectRankField
              disabled={isSubmitting}
              {...getFieldProps('rankId')}
            />
            <SelectDegreeField
              rankId={values.rankId}
              disabled={isSubmitting}
              {...getFieldProps('degreeId')}
            />
          </Stack>

          <ApiErrors />

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Registrar
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default PersonForm;
