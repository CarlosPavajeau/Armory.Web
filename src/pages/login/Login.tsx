import { Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/styles';
import createStyles from '@material-ui/styles/createStyles';
import withStyles from '@material-ui/styles/withStyles';
import { useFormik } from 'formik';
import { ReactElement, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { authorizeUser } from '../../modules/users/Service';
import {
  loginSuccess,
  selectErrors,
  selectIsAuthenticate,
  selectUiStatus,
} from '../../modules/users/Slice';

const loginStyles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'background.default',
      height: '100%',
      paddingTop: 'calc(50vh - 250px)',
    },
    mb_3: {
      marginBottom: theme.spacing(3),
    },
    py_2: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  });

export type LoginProps = WithStyles<typeof loginStyles>;

const loginValidationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required(
    'Su nombre de usuario o email son requeridos',
  ),
  password: Yup.string().required('Su contraseña de acceso es requerida'),
});

const Login = (props: LoginProps): ReactElement => {
  const { classes } = props;
  const status = useAppSelector(selectUiStatus);
  const authErrors = useAppSelector(selectErrors);
  const isAuth = useAppSelector(selectIsAuthenticate);
  const dispatch = useAppDispatch();

  const history = useNavigate();
  useEffect(() => {
    if (isAuth) {
      history('/dashboard');
    }
  }, [isAuth, history]);

  const loginForm = useFormik({
    initialValues: {
      usernameOrEmail: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async values => {
      try {
        const result = await authorizeUser({ ...values, isPersistent: false });
        dispatch(loginSuccess(result));
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
      <Box className={classes.root}>
        <Container maxWidth="sm">
          <Card variant="outlined">
            <LinearProgress hidden={!isSubmitting} />
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Box className={classes.mb_3}>
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
                {(status === 'userNotFound' ||
                  status === 'incorrectPassword') && (
                  <Typography
                    color="error"
                    variant="body2"
                    className={classes.py_2}
                  >
                    {authErrors}
                  </Typography>
                )}
                <Box className={classes.py_2}>
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
      </Box>
    </>
  );
};

export default withStyles(loginStyles)(Login);
