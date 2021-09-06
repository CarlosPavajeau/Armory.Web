import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';
import {
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Link,
  Stack,
  TextField,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from 'common/hooks';
import Storage from 'common/plugins/Storage';
import ApiErrors from 'components/feedback/ApiErrors';
import { Form, FormikProvider, useFormik } from 'formik';
import { authorizeUser } from 'modules/auth/Service';
import { authenticate } from 'modules/auth/Slice';
import { ReactElement, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';

const LoginForm = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

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
      try {
        const result = await authorizeUser({ ...values, isPersistent: false });

        const token = Storage.decode(result);
        const { role, email } = token;
        dispatch(
          authenticate({ isAuthenticate: true, role, token: result, email }),
        );
      } catch (err) {
        // Ignore error
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword(show => !show);
  };

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

          <TextField
            type={showPassword ? 'text' : 'password'}
            label="Contraseña"
            helperText={
              touched.password && errors.password
                ? errors.password
                : 'Digite su contraseña de acceso'
            }
            error={Boolean(touched.password && errors.password)}
            disabled={isSubmitting}
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleShowPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
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
