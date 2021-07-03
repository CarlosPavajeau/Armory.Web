import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles, WithStyles } from '@material-ui/core';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { formStyles } from '../../common/styles';
import { CreateSquadronRequest } from '../../modules/squadrons/Models';
import { createSquadron } from '../../modules/squadrons/Service';
import {
  resetRegister,
  selectError,
  selectWasRegistered,
} from '../../modules/squadrons/Slice';

const registerSquadronScheme = Yup.object().shape({
  code: Yup.string().required('Este campo es requerido'),
  name: Yup.string().required('Este campo es requerido'),
  armoryUserId: Yup.string().required('Este campo es requerido'),
});

export type RegisterSquadronProps = WithStyles<typeof formStyles>;

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
      personId: '',
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
                errors.personId && touched.personId
                  ? errors.personId
                  : 'Seleccione la persona a cargo'
              }
              error={!!(errors.personId && touched.personId)}
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

export default withStyles(formStyles)(RegisterSquadron);
