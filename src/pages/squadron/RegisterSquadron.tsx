import {
  Button,
  createStyles,
  LinearProgress,
  Paper,
  TextField,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { CreateSquadronRequest } from '../../modules/Squadron/Models/CreateSquadronRequest';
import { createSquadron } from '../../modules/Squadron/SquadronService';
import {
  resetRegister,
  selectError,
  selectWasRegistered,
} from '../../modules/Squadron/SquadronSlice';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: 936,
      margin: 'auto',
      overflow: 'hidden',
    },
    contentWrapper: {
      margin: '40px 16px',
    },
    form: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    formField: {
      marginBottom: theme.spacing(2),
    },
    registerError: {
      marginTop: theme.spacing(2),
    },
  });

const registerSquadronScheme = Yup.object().shape({
  code: Yup.string().required('Este campo es requerido'),
  name: Yup.string().required('Este campo es requerido'),
  armoryUserId: Yup.string().required('Este campo es requerido'),
});

export type RegisterSquadronProps = WithStyles<typeof styles>;

const RegisterSquadron = (props: RegisterSquadronProps): React.ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetRegister());
  }, [dispatch]);

  const registerError = useAppSelector(selectError);
  const wasRegistered = useAppSelector(selectWasRegistered);

  const registerSquadronForm = useFormik<CreateSquadronRequest>({
    initialValues: {
      code: '',
      name: '',
      armoryUserId: '',
    },
    validationSchema: registerSquadronScheme,
    onSubmit: async (values: CreateSquadronRequest) => {
      await createSquadron(values, dispatch);
    },
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = registerSquadronForm;

  return (
    <>
      <Helmet>
        <title>Armería | Registrar escuadrilla</title>
      </Helmet>
      <Paper className={classes.paper}>
        <LinearProgress hidden={!isSubmitting} />
        <div className={classes.contentWrapper}>
          <Typography variant="h5" align="center">
            Registrar escuadrilla
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              id="code"
              name="code"
              label="Código"
              placeholder="Ejemplo: 3AFF"
              helperText={
                errors.code && touched.code
                  ? errors.code
                  : 'Digite el código de la escuadrilla'
              }
              error={!!(errors.code && touched.code)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <TextField
              id="name"
              name="name"
              label="Nombre"
              placeholder="Ejemplo: Escuadrón de cacería"
              helperText={
                errors.name && touched.name
                  ? errors.name
                  : 'Digite el nombre de la escuadrilla'
              }
              error={!!(errors.name && touched.name)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <TextField
              id="armoryUserId"
              name="armoryUserId"
              label="Persona a cargo"
              placeholder="Ejemplo: Manolo"
              helperText={
                errors.armoryUserId && touched.armoryUserId
                  ? errors.armoryUserId
                  : 'Seleccione la persona a cargo'
              }
              error={!!(errors.armoryUserId && touched.armoryUserId)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isSubmitting}
              fullWidth
            >
              Registrar escuadrilla
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
      {wasRegistered && <Redirect to="/dashboard/squadrons" />}
    </>
  );
};

export default withStyles(styles)(RegisterSquadron);
