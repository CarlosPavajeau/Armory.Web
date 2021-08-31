import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/styles';
import withStyles from '@material-ui/styles/withStyles';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { formStyles } from 'common/styles';
import { useFormik } from 'formik';
import { CreateEquipmentRequest } from 'modules/armament/equipments/Models';
import {
  checkExists,
  createEquipment,
} from 'modules/armament/equipments/Service';
import {
  apiError,
  registeredCorrectly,
  resetRegister,
  selectError,
  selectWasRegistered,
} from 'modules/armament/equipments/Slice';
import React, { ReactElement, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const registerEquipmentSchema = Yup.object().shape({
  code: Yup.string()
    .required('Este campo es requerido')
    .test(
      'CheckExists',
      'Ya existe un equipo especial o accesorio con el código digitado',
      value => {
        return new Promise(resolve => {
          if (value === undefined || value === '') {
            resolve(true);
            return;
          }

          checkExists(value || '')
            .then(result => resolve(!result))
            .catch(() => resolve(true));
        });
      },
    ),
  type: Yup.string().required('Este campo es requerido'),
  model: Yup.string().required('Este campo es requerido'),
  series: Yup.string().required('Este campo es requerido'),
  quantityAvailable: Yup.number().required('Este campo es requerido'),
});

export type RegisterEquipmentProps = WithStyles<typeof formStyles>;

const RegisterEquipment = (props: RegisterEquipmentProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();

  const registerError = useAppSelector(selectError);
  const wasRegistered = useAppSelector(selectWasRegistered);

  const history = useNavigate();
  useEffect(() => {
    if (wasRegistered) {
      history('/dashboard/equipments');
      dispatch(resetRegister());
    }
  }, [dispatch, history, wasRegistered]);

  const registerEquipmentForm = useFormik<CreateEquipmentRequest>({
    initialValues: {
      code: '',
      type: '',
      model: '',
      series: '',
      quantityAvailable: 0,
    },
    validationSchema: registerEquipmentSchema,
    onSubmit: async values => {
      try {
        await createEquipment(values);
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
  } = registerEquipmentForm;

  return (
    <>
      <Helmet>
        <title>Armeria | Registro de equipo especial y accesorio</title>
      </Helmet>
      <Paper className={classes.paper}>
        <LinearProgress hidden={!isSubmitting} />
        <div className={classes.contentWrapper}>
          <Typography variant="h5" align="center">
            Registro de equipo especial o accesorio
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              id="code"
              name="code"
              label="Código"
              helperText={
                errors.code && touched.code
                  ? errors.code
                  : 'Digite el código del equipo especial o accesorio'
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
                  : 'Digite el tipo del equipo especial o accesorio'
              }
              error={!!(errors.type && touched.type)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <TextField
              id="model"
              name="model"
              label="Modelo"
              helperText={
                errors.model && touched.model
                  ? errors.model
                  : 'Digite el modelo del equipo especial o accesorio'
              }
              error={!!(errors.model && touched.model)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <TextField
              id="series"
              name="series"
              label="Numero de serie"
              helperText={
                errors.series && touched.series
                  ? errors.series
                  : 'Digite el numero de serie del equipo especial o accesorio'
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
                  : 'Digite la cantidad disponible del equipo especial o accesorio'
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
              Registrar equipo especial o accesorio
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

export default withStyles(formStyles)(RegisterEquipment);
