import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useAppSelector } from 'common/hooks';
import PersonalDataForm from 'components/dashboard/people/PersonalDataForm';
import { Form, FormikProvider, useFormik } from 'formik';
import { UpdatePersonRequest } from 'modules/people/models';
import PeopleService from 'modules/people/service';
import { selectCurrentPerson } from 'modules/people/slice';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const UpdatePersonForm = (): ReactElement => {
  const currentPerson = useAppSelector(selectCurrentPerson);

  const UpdatePersonScheme = Yup.object().shape({
    id: Yup.string()
      .required('Este campo es requerido')
      .max(10, 'No se permiten más de 10 caracteres'),
    firstName: Yup.string().required('Este campo es requerido'),
    secondName: Yup.string(),
    lastName: Yup.string().required('Este campo es requerido'),
    secondLastName: Yup.string().required('Este campo es requerido'),
  });

  const navigate = useNavigate();
  const formik = useFormik<UpdatePersonRequest>({
    initialValues: {
      id: currentPerson?.id || '',
      firstName: currentPerson?.firstName || '',
      secondName: currentPerson?.secondName || '',
      lastName: currentPerson?.lastName || '',
      secondLastName: currentPerson?.secondLastName || '',
    },
    validationSchema: UpdatePersonScheme,
    onSubmit: async value => {
      await PeopleService.update(value);
      navigate('/dashboard');
    },
  });

  const { handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField label="Identificación" disabled {...getFieldProps('id')} />

          <PersonalDataForm />

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Actualizar datos personales
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default UpdatePersonForm;
