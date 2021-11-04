import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useFormikContext } from 'formik';
import {
  CreatePersonRequest,
  UpdatePersonRequest,
} from 'modules/people/models';
import { CreateTroopRequest } from 'modules/troopers/models';
import React, { ReactElement } from 'react';

const PersonalDataForm = (): ReactElement => {
  const formik = useFormikContext<
    UpdatePersonRequest | CreatePersonRequest | CreateTroopRequest
  >();

  const { errors, touched, isSubmitting, getFieldProps } = formik;

  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          label="Primer nombre"
          placeholder="Ejemplo: Manolo"
          helperText={
            errors.firstName && touched.firstName ? errors.firstName : ' '
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
            errors.secondName && touched.secondName ? errors.secondName : ' '
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
            errors.lastName && touched.lastName ? errors.lastName : ' '
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
              : ' '
          }
          error={!!(errors.secondLastName && touched.secondLastName)}
          disabled={isSubmitting}
          {...getFieldProps('secondLastName')}
          fullWidth
        />
      </Stack>
    </>
  );
};

export default PersonalDataForm;
