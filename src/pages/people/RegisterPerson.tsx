import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  TextField,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { formStyles } from '../../common/styles';
import { CreatePersonRequest } from '../../modules/people/Models';
import { createPerson } from '../../modules/people/Service';
import {
  resetRegister,
  selectError,
  selectWasRegistered,
} from '../../modules/people/Slice';

export type RegisterPersonProps = WithStyles<typeof formStyles>;

const registerPersonScheme = Yup.object().shape({
  id: Yup.string()
    .required('Este campo es requerido')
    .max(10, 'No se permiten más de 10 caracteres'),
  firstName: Yup.string().required('Este campo es requerido'),
  secondName: Yup.string().required('Este campo es requerido'),
  lastName: Yup.string().required('Este campo es requerido'),
  secondLastName: Yup.string().required('Este campo es requerido'),
});

const RegisterPerson = (props: RegisterPersonProps): React.ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetRegister());
  }, [dispatch]);

  const registerError = useAppSelector(selectError);
  const wasRegistered = useAppSelector(selectWasRegistered);

  const registerPersonForm = useFormik<CreatePersonRequest>({
    initialValues: {
      id: '',
      firstName: '',
      secondName: '',
      lastName: '',
      secondLastName: '',
      armoryUserId: '',
    },
    validationSchema: registerPersonScheme,
    onSubmit: async values => {
      await createPerson(values, dispatch);
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
      {wasRegistered && <Redirect to="/dashboard" />}
    </>
  );
};

export default withStyles(formStyles)(RegisterPerson);
