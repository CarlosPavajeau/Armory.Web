import { FormHelperText, WithStyles, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useFormik } from 'formik';
import { ReactElement, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { formStyles } from '../../common/styles';
import CircularLoader from '../../components/loading/CircularLoader';
import { CreatePersonRequest } from '../../modules/people/Models';
import { createPerson } from '../../modules/people/Service';
import {
  apiError,
  registeredCorrectly,
  resetRegister,
  selectError,
  selectWasRegistered,
} from '../../modules/people/Slice';
import { getRoles } from '../../modules/users/Service';
import {
  loadingRoles,
  loadRoles,
  selectRoles,
  selectUiStatus,
} from '../../modules/users/Slice';

export type RegisterPersonProps = WithStyles<typeof formStyles>;

const registerPersonScheme = Yup.object().shape({
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
  roleName: Yup.string().required('Este campo es requerido'),
});

const RegisterPerson = (props: RegisterPersonProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const userUiStatus = useAppSelector(selectUiStatus);
  const roles = useAppSelector(selectRoles);
  const registerError = useAppSelector(selectError);
  const wasRegistered = useAppSelector(selectWasRegistered);

  const history = useHistory();
  useEffect(() => {
    if (wasRegistered) {
      history.push('/dashboard/people');
      dispatch(resetRegister());
    }
  }, [dispatch, history, wasRegistered]);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingRoles());
        const result = await getRoles();
        dispatch(loadRoles(result));
      } catch (err) {
        // Ignore error
      }
    })();
  }, [dispatch]);

  const translateRoleName = (roleName: string): string => {
    switch (roleName) {
      case 'SquadronLeader':
        return 'Jefe de escuadrilla';
      case 'SquadLeader':
        return 'Jefe de escuadra';
      case 'StoreLeader':
        return 'Jefe de bodega';
      default:
        return 'Rol no identificado';
    }
  };

  const registerPersonForm = useFormik<CreatePersonRequest>({
    initialValues: {
      id: '',
      firstName: '',
      secondName: '',
      lastName: '',
      secondLastName: '',
      email: '',
      phoneNumber: '',
      roleName: '',
    },
    validationSchema: registerPersonScheme,
    onSubmit: async values => {
      try {
        await createPerson(values);
        dispatch(registeredCorrectly());
      } catch (err) {
        dispatch(apiError(err.message));
      }
    },
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = registerPersonForm;

  return (
    <>
      <Helmet>
        <title>Armería | Registro de persona</title>
      </Helmet>
      <Paper className={classes.paper}>
        <LinearProgress hidden={!isSubmitting} />
        <div className={classes.contentWrapper}>
          <Typography variant="h5" align="center">
            Registrar persona
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              id="id"
              name="id"
              label="Identificación"
              placeholder="Ejemplo: 1234567890"
              helperText={
                errors.id && touched.id
                  ? errors.id
                  : 'Digite la identificación de la persona'
              }
              error={!!(errors.id && touched.id)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              required
              fullWidth
            />
            <TextField
              id="firstName"
              name="firstName"
              label="Primer nombre"
              placeholder="Ejemplo: Manolo"
              helperText={
                errors.firstName && touched.firstName
                  ? errors.firstName
                  : 'Digite el primer nombre de la persona'
              }
              error={!!(errors.firstName && touched.firstName)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              required
              fullWidth
            />
            <TextField
              id="secondName"
              name="secondName"
              label="Segundo nombre"
              placeholder="Ejemplo: Juan"
              helperText={
                errors.secondName && touched.secondName
                  ? errors.secondName
                  : 'Digite el segundo nombre de la persona'
              }
              error={!!(errors.secondName && touched.secondName)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <TextField
              id="lastName"
              name="lastName"
              label="Primer apellido"
              placeholder="Ejemplo: Peréz"
              helperText={
                errors.lastName && touched.lastName
                  ? errors.lastName
                  : 'Digite el primer apellido de la persona'
              }
              error={!!(errors.lastName && touched.lastName)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              required
              fullWidth
            />
            <TextField
              id="secondLastName"
              name="secondLastName"
              label="Segundo apellido"
              placeholder="Ejemplo: Torres"
              helperText={
                errors.secondLastName && touched.secondLastName
                  ? errors.secondLastName
                  : 'Digite el segundo apellido de la persona'
              }
              error={!!(errors.secondLastName && touched.secondLastName)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  placeholder="example@example.com"
                  helperText={
                    errors.email && touched.email
                      ? errors.email
                      : 'Digite el email de la persona'
                  }
                  error={!!(errors.email && touched.email)}
                  className={classes.formField}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  fullWidth
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Número de teléfono"
                  placeholder="3000000000"
                  helperText={
                    errors.phoneNumber && touched.phoneNumber
                      ? errors.phoneNumber
                      : 'Digite el número de teléfono de la persona'
                  }
                  error={!!(errors.phoneNumber && touched.phoneNumber)}
                  className={classes.formField}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  fullWidth
                />
              </Grid>
            </Grid>
            <FormControl
              error={!!(errors.roleName && touched.roleName)}
              className={classes.formField}
              fullWidth
            >
              <InputLabel id="select-role-label">Rol de la persona</InputLabel>
              <Select
                id="roleName"
                name="roleName"
                labelId="select-role-label"
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue=""
                fullWidth
              >
                {userUiStatus === 'loading' && (
                  <MenuItem value="">
                    <CircularLoader size={40} message="Cargando roles..." />
                  </MenuItem>
                )}
                {userUiStatus === 'loaded' &&
                  roles &&
                  roles
                    .filter(r => r.name !== 'Developer')
                    .map(r => {
                      return (
                        <MenuItem value={r.name} key={r.name}>
                          {translateRoleName(r.name)}
                        </MenuItem>
                      );
                    })}
              </Select>
              <FormHelperText error={!!(errors.roleName && touched.roleName)}>
                {errors.roleName && touched.roleName
                  ? errors.roleName
                  : 'Seleccione el rol de la persona'}
              </FormHelperText>
            </FormControl>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.submitButton}
              disabled={isSubmitting}
              fullWidth
            >
              Registrar persona
            </Button>
          </form>
          {registerError && (
            <Typography
              align="center"
              color="error"
              variant="subtitle2"
              className={classes.registerError}
            >
              {registerError}
            </Typography>
          )}
        </div>
      </Paper>
    </>
  );
};

export default withStyles(formStyles)(RegisterPerson);
