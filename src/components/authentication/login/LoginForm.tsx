import { LoadingButton } from '@mui/lab';
import {
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  TextField,
} from '@mui/material';
import { useAppDispatch } from 'common/hooks';
import ApiErrors from 'components/feedback/ApiErrors';
import PasswordField from 'components/forms/PasswordField';
import { Form, FormikProvider, useFormik } from 'formik';
import { authenticate } from 'modules/auth/slice';
import { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';

const LoginForm = (): ReactElement => {
  const dispatch = useAppDispatch();

  const LoginSchema = Yup.object().shape({
    usernameOrEmail: Yup.string().required(
      'Su nombre de usuario o email son requeridos',
    ),
    password: Yup.string().required('Su contraseña de acceso es requerida'),
  });

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: '',
      password: '',
      isPersistent: false,
    },
    validationSchema: LoginSchema,
    onSubmit: async values => {
      dispatch(authenticate(values));
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit} noValidate>
        <Stack spacing={3}>
          <TextField
            label="Usuario o email"
            autoComplete="username"
            helperText={
              touched.usernameOrEmail && errors.usernameOrEmail
                ? errors.usernameOrEmail
                : 'Digite su nombre de usuario o email'
            }
            error={Boolean(touched.usernameOrEmail && errors.usernameOrEmail)}
            disabled={isSubmitting}
            {...getFieldProps('usernameOrEmail')}
            fullWidth
          />

          <PasswordField
            label="Contraseña"
            helperText="Digite su contraseña de acceso"
            disabled={isSubmitting}
            {...getFieldProps('password')}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps('isPersistent')}
                checked={values.isPersistent}
              />
            }
            label="¿Recodar datos?"
            disabled={isSubmitting}
          />

          <Link
            component={RouterLink}
            variant="subtitle2"
            to="/forgotten_password"
          >
            ¿Ha olvidado su contraseña?
          </Link>
        </Stack>

        <ApiErrors />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Iniciar sesión
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
};

export default LoginForm;
