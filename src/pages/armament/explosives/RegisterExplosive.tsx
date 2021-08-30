import { WithStyles, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { formStyles } from 'common/styles';
import { useFormik } from 'formik';
import { CreateExplosiveRequest } from 'modules/armament/explosives/Models';
import {
  checkExists,
  createExplosive,
} from 'modules/armament/explosives/Service';
import {
  apiError,
  registeredCorrectly,
  resetRegister,
  selectError,
  selectWasRegistered,
} from 'modules/armament/explosives/Slice';
import React, { ReactElement, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

const registerExplosiveSchema = Yup.object().shape({
  code: Yup.string()
    .required('Este campo es requerido')
    .test(
      'CheckExists',
      'Ya existe un explosivo con el código digitado',
      value => {
        return new Promise(resolve => {
          if (value === undefined || value === '') {
            resolve(true);
            return;
          }

          checkExists(value || '')
            .then(result => {
              resolve(!result);
            })
            .catch(() => resolve(true));
        });
      },
    ),
  type: Yup.string().required('Este campo es requerido'),
  mark: Yup.string().required('Este campo es requerido'),
  caliber: Yup.string().required('Este campo es requerido'),
  lot: Yup.string().required('Este campo es requerido'),
  series: Yup.string().required('Este campo es requerido'),
  quantityAvailable: Yup.number().required('Este campo es requerido'),
});

export type RegisterExplosiveProps = WithStyles<typeof formStyles>;

const RegisterExplosive = (props: RegisterExplosiveProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();

  const registerError = useAppSelector(selectError);
  const wasRegistered = useAppSelector(selectWasRegistered);

  const history = useHistory();
  useEffect(() => {
    if (wasRegistered) {
      history.push('/dashboard/explosives');
      dispatch(resetRegister());
    }
  }, [dispatch, history, wasRegistered]);

  const registerExplosiveForm = useFormik<CreateExplosiveRequest>({
    initialValues: {
      code: '',
      type: '',
      mark: '',
      caliber: '',
      lot: '',
      series: '',
      quantityAvailable: 0,
    },
    validationSchema: registerExplosiveSchema,
    onSubmit: async values => {
      try {
        await createExplosive(values);
        dispatch(registeredCorrectly());
      } catch (err: unknown) {
        dispatch(apiError((err as Error).message));
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
  } = registerExplosiveForm;

  return (
    <>
      <Helmet>
        <title>Armeria | Registro de explosivo</title>
      </Helmet>
      <Paper className={classes.paper}>
        <LinearProgress hidden={!isSubmitting} />
        <div className={classes.contentWrapper}>
          <Typography variant="h5" align="center">
            Registro de explosivo
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              id="code"
              name="code"
              label="Código"
              helperText={
                errors.code && touched.code
                  ? errors.code
                  : 'Digite el código del explosivo'
              }
              error={!!(errors.code && touched.code)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <TextField
              id="type"
              name="type"
              label="Tipo"
              helperText={
                errors.type && touched.type
                  ? errors.type
                  : 'Digite el tipo del explosivo'
              }
              error={!!(errors.type && touched.type)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <TextField
              id="mark"
              name="mark"
              label="Marca"
              helperText={
                errors.mark && touched.mark
                  ? errors.mark
                  : 'Digite la marca del explosivo'
              }
              error={!!(errors.mark && touched.mark)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <TextField
              id="caliber"
              name="caliber"
              label="Calibre"
              helperText={
                errors.caliber && touched.caliber
                  ? errors.caliber
                  : 'Digite el calibre del explosivo'
              }
              error={!!(errors.caliber && touched.caliber)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <TextField
              id="lot"
              name="lot"
              label="Lote"
              helperText={
                errors.lot && touched.lot
                  ? errors.lot
                  : 'Digite el lote del explosivo'
              }
              error={!!(errors.lot && touched.lot)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <TextField
              id="series"
              name="series"
              label="Número de serie"
              helperText={
                errors.series && touched.series
                  ? errors.series
                  : 'Digite el número de serie del explosivo'
              }
              error={!!(errors.series && touched.series)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <TextField
              id="quantityAvailable"
              name="quantityAvailable"
              label="Cantidad disponible"
              helperText={
                errors.quantityAvailable && touched.quantityAvailable
                  ? errors.quantityAvailable
                  : 'Digite la cantidad disponible del explosivo'
              }
              error={!!(errors.quantityAvailable && touched.quantityAvailable)}
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
              Registrar explosivo
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

export default withStyles(formStyles)(RegisterExplosive);
