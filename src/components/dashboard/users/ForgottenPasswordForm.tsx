import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Form, FormikProvider, useFormik } from 'formik';
import UsersService from 'modules/users/service';
import { ReactElement, useState } from 'react';
import * as Yup from 'yup';

interface ForgottenPasswordFormValue {
  email: string;
}

const ForgottenPasswordForm = (): ReactElement => {
  const [success, setSuccess] = useState(false);

  const ForgottenPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email inválido')
      .required('Este campo es requerido'),
  });

  const formik = useFormik<ForgottenPasswordFormValue>({
    initialValues: {
      email: '',
    },
    validationSchema: ForgottenPasswordSchema,
    onSubmit: async value => {
      await UsersService.forgottenPassword(value.email);
      setSuccess(true);
    },
  });

  const { handleSubmit, errors, touched, isSubmitting, getFieldProps } = formik;

  if (success) {
    return (
      <Typography>
        Hemos enviado un correo a la dirección que nos has proporcionado con
        instrucciones para recuperar tu contraseña.
      </Typography>
    );
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Email"
            autoComplete="email"
            helperText={touched.email && errors.email ? errors.email : ' '}
            error={!!(touched.email && errors.email)}
            {...getFieldProps('email')}
            fullWidth
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Enviar
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default ForgottenPasswordForm;
