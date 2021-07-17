import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles, WithStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
import { formStyles } from '../../../common/styles';
import { useAppDispatch, useAppSelector } from '../../../common/hooks';
import { CreateExplosiveRequest } from '../../../modules/armament/explosives/Models';
import { createExplosive } from '../../../modules/armament/explosives/Service';
import {
  resetRegister,
  selectError,
  selectWasRegistered,
} from '../../../modules/armament/explosives/Slice';

const registerExplosiveSchema = Yup.object().shape({
  code: Yup.string().required(),
  type: Yup.string().required(),
  mark: Yup.string().required(),
  caliber: Yup.string().required(),
  lot: Yup.string().required(),
  series: Yup.string().required(),
  quantityAvailable: Yup.number().required(),
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
    }
  }, [history, wasRegistered]);

  useEffect(() => {
    dispatch(resetRegister());
  }, [dispatch]);

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
      await createExplosive(values, dispatch);
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
