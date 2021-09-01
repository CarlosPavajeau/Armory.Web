import { Fade, useTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Link from '@material-ui/core/Link';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useAppDispatch } from 'common/hooks';
import Storage from 'common/plugins/Storage';
import ApiErrors from 'components/feedback/ApiErrors';
import { useFormik } from 'formik';
import { authorizeUser } from 'modules/auth/Service';
import { authenticate } from 'modules/auth/Slice';
import { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';

const RootStyle = styled(Box)({
  backgroundColor: 'background.default',
  height: '100%',
  paddingTop: 'calc(50vh - 250px)',
});

const loginValidationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required(
    'Su nombre de usuario o email son requeridos',
  ),
  password: Yup.string().required('Su contraseña de acceso es requerida'),
});

const Login = (): ReactElement => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const loginForm = useFormik({
    initialValues: {
      usernameOrEmail: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async values => {
      try {
        const result = await authorizeUser({ ...values, isPersistent: false });

        const token = Storage.decode(result);
        const { role } = token;
        dispatch(authenticate({ isAuthenticate: true, role, token: result }));
      } catch (err) {
        // Ignore error
      }
    },
  });

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    touched,
  } = loginForm;

  return (
    <>
      <Helmet>
        <title>Iniciar sesión | Armería</title>
      </Helmet>
      <RootStyle>
        <Container maxWidth="sm">
          <Card variant="outlined">
            <Fade in={isSubmitting}>
              <LinearProgress />
            </Fade>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Box sx={{ marginBottom: theme.spacing(3) }}>
                  <Typography color="textPrimary" variant="h4">
                    Iniciar sesión
                  </Typography>
                </Box>
                <TextField
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  label="Usuario o email"
                  variant="outlined"
                  margin="normal"
                  helperText={
                    touched.usernameOrEmail && errors.usernameOrEmail
                      ? errors.usernameOrEmail
                      : 'Digite su nombre de usuario o email'
                  }
                  placeholder="Ejemplo: manolos"
                  fullWidth
                  error={!!(touched.usernameOrEmail && errors.usernameOrEmail)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  label="Contraseña"
                  variant="outlined"
                  margin="normal"
                  helperText={
                    touched.password && errors.password
                      ? errors.password
                      : 'Digite su contraseña de acceso'
                  }
                  fullWidth
                  error={!!(touched.password && errors.password)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <ApiErrors />
                <Box sx={{ paddingY: theme.spacing(2) }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    type="submit"
                    variant="contained"
                  >
                    Iniciar sesión
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body2">
                  ¿Has olvidado tu contraseña?{' '}
                  <Link
                    component={RouterLink}
                    to="/forgotten_password"
                    variant="body2"
                  >
                    Recupérala.
                  </Link>
                </Typography>
              </form>
            </CardContent>
          </Card>
        </Container>
      </RootStyle>
    </>
  );
};

export default Login;
