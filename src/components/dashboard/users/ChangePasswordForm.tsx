import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import { useAppSelector } from 'common/hooks';
import ApiErrors from 'components/feedback/ApiErrors';
import PasswordField from 'components/forms/PasswordField';
import Consola from 'consola';
import { Form, FormikProvider, useFormik } from 'formik';
import { selectEmail } from 'modules/auth/slice';
import { ChangePasswordRequest } from 'modules/users/models';
import UsersService from 'modules/users/service';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const ChangePasswordForm = (): ReactElement => {
  const ChangePasswordSchema = Yup.object().shape({
    usernameOrEmail: Yup.string().required('Este campo es requerido'),
    oldPassword: Yup.string().required('Este campo es requerido'),
    newPassword: Yup.string().required('Este campo es requerido'),
  });

  const email = useAppSelector(selectEmail);

  const navigate = useNavigate();
  const formik = useFormik<ChangePasswordRequest>({
    initialValues: {
      usernameOrEmail: email ?? '',
      oldPassword: '',
      newPassword: '',
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: async values => {
      try {
        await UsersService.changePassword(values);
        navigate('/dashboard');
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
      }
    },
  });

  const { handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <PasswordField
            label="Antigua contraseña"
            helperText={' '}
            disabled={isSubmitting}
            {...getFieldProps('oldPassword')}
          />

          <PasswordField
            label="Nueva contraseña"
            helperText="Nueva contraseña de acceso"
            disabled={isSubmitting}
            {...getFieldProps('newPassword')}
          />

          <ApiErrors />

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Cambiar contraseña de acceso
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default ChangePasswordForm;
