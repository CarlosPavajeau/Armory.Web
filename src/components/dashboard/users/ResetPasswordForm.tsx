import { LoadingButton } from '@mui/lab';
import { Alert } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useQuery } from 'common/hooks';
import PasswordField from 'components/forms/PasswordField';
import { Form, FormikProvider, useFormik } from 'formik';
import { ResetPasswordRequest } from 'modules/users/models';
import UsersService from 'modules/users/service';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const ResetPasswordForm = (): ReactElement => {
  const query = useQuery();
  const token = query.get('token');
  const email = query.get('email');

  const ResetPasswordSchema = Yup.object().shape({
    token: Yup.string().required('Token requerido'),
    email: Yup.string().required('Email requerido'),
    newPassword: Yup.string().required('El campo es requerido'),
  });

  const navigate = useNavigate();
  const formik = useFormik<ResetPasswordRequest>({
    initialValues: {
      token: token || '',
      email: email || '',
      newPassword: '',
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async value => {
      await UsersService.resetPassword(value);
      navigate('/login');
    },
  });

  if (token === null || email === null) {
    return (
      <Alert severity="error">
        Enlace de reestrablecimiento de contraseña inválido.
      </Alert>
    );
  }

  const { getFieldProps, handleSubmit, isSubmitting } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <PasswordField
            label="Contraseña"
            helperText="Digite su contraseña de acceso"
            disabled={isSubmitting}
            {...getFieldProps('newPassword')}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Reestablecer contraseña
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default ResetPasswordForm;
