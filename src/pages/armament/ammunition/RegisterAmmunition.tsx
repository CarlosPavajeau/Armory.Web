import { WithStyles, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useFormik } from 'formik';
import { ReactElement, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../../common/hooks';
import { formStyles } from '../../../common/styles';
import { CreateAmmunitionRequest } from '../../../modules/armament/ammunition/Models';
import {
  checkExists,
  createAmmunition,
} from '../../../modules/armament/ammunition/Service';
import {
  apiError,
  registeredCorrectly,
  resetRegister,
  selectError,
  selectWasRegistered,
} from '../../../modules/armament/ammunition/Slice';

const registerAmmunitionSchema = Yup.object().shape({
  code: Yup.string()
    .required('Este campo es requerido')
    .test(
      'CheckExists',
      'Ya existe una munición con el código digitado',
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
            .catch(() => {
              resolve(true);
            });
        });
      },
    ),
  type: Yup.string().required('Este campo es requerido'),
  mark: Yup.string().required('Este campo es requerido'),
  caliber: Yup.string().required('Este campo es requerido'),
  series: Yup.string().required('Este campo es requerido'),
  lot: Yup.string().required('Este campo es requerido'),
  quantityAvailable: Yup.number().required('Este campo es requerido'),
});

export type RegisterAmmunitionProps = WithStyles<typeof formStyles>;

const RegisterAmmunition = (props: RegisterAmmunitionProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();

  const registerError = useAppSelector(selectError);
  const wasRegistered = useAppSelector(selectWasRegistered);

  const history = useHistory();
  useEffect(() => {
    if (wasRegistered) {
      history.push('/dashboard/ammunition');
      dispatch(resetRegister());
    }
  }, [dispatch, history, wasRegistered]);

  const registerAmmunitionForm = useFormik<CreateAmmunitionRequest>({
    initialValues: {
      code: '',
      type: '',
      mark: '',
      caliber: '',
      series: '',
      lot: '',
      quantityAvailable: 0,
    },
    validationSchema: registerAmmunitionSchema,
    onSubmit: async values => {
      try {
        await createAmmunition(values);
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
  } = registerAmmunitionForm;

  return (
    <>
      <Helmet>
        <title>Armería | Registro de munición</title>
      </Helmet>
      <Paper className={classes.paper}>
        <LinearProgress hidden={!isSubmitting} />
        <div className={classes.contentWrapper}>
          <Typography variant="h5" align="center">
            Registro de munición
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              id="code"
              name="code"
              label="Código"
              helperText={
                errors.code && touched.code
                  ? errors.code
                  : 'Digite el código de la munición'
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
                  : 'Digite el tipo de la munición'
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
                  : 'Digite la marca de la munición'
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
                  : 'Digite el calibre de la munición'
              }
              error={!!(errors.caliber && touched.caliber)}
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
                  : 'Digite el número de serie de la munición'
              }
              error={!!(errors.series && touched.series)}
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
                errors.mark && touched.mark
                  ? errors.mark
                  : 'Digite el lote de la munición'
              }
              error={!!(errors.lot && touched.lot)}
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
                  : 'Digite la cantidad disponible de la munición'
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
              disabled={isSubmitting}
              fullWidth
            >
              Registrar munición
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

export default withStyles(formStyles)(RegisterAmmunition);
