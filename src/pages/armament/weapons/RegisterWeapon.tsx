import { ReactElement, useEffect } from 'react';
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
import { CreateWeaponRequest } from '../../../modules/armament/weapons/Models';
import { createWeapon } from '../../../modules/armament/weapons/Service';
import {
  resetRegister,
  selectError,
  selectWasRegistered,
} from '../../../modules/armament/weapons/Slice';

const registerWeaponSchema = Yup.object().shape({
  code: Yup.string().required('Este campo es requerido'),
  type: Yup.string().required('Este campo es requerido'),
  mark: Yup.string().required('Este campo es requerido'),
  model: Yup.string().required('Este campo es requerido'),
  caliber: Yup.string().required('Este campo es requerido'),
  series: Yup.string().required('Este campo es requerido'),
  lot: Yup.string().required('Este campo es requerido'),
  numberOfProviders: Yup.number().required('Este campo es requerido'),
  providerCapacity: Yup.number().required('Este campo es requerido'),
  quantityAvailable: Yup.number().required('Este campo es requerido'),
});

export type RegisterWeaponProps = WithStyles<typeof formStyles>;

const RegisterWeapon = (props: RegisterWeaponProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();

  const registerError = useAppSelector(selectError);
  const wasRegistered = useAppSelector(selectWasRegistered);

  const history = useHistory();
  useEffect(() => {
    if (wasRegistered) {
      history.push('/dashboard/weapons');
    }
  }, [history, wasRegistered]);

  useEffect(() => {
    dispatch(resetRegister());
  }, [dispatch]);

  const registerWeaponForm = useFormik<CreateWeaponRequest>({
    initialValues: {
      code: '',
      type: '',
      mark: '',
      model: '',
      caliber: '',
      series: '',
      lot: '',
      numberOfProviders: 0,
      providerCapacity: 0,
      quantityAvailable: 0,
    },
    validationSchema: registerWeaponSchema,
    onSubmit: async values => {
      await createWeapon(values, dispatch);
    },
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = registerWeaponForm;

  return (
    <>
      <Helmet>
        <title>Armería | Registro de arma</title>
      </Helmet>
      <Paper className={classes.paper}>
        <LinearProgress hidden={!isSubmitting} />
        <div className={classes.contentWrapper}>
          <Typography variant="h5" align="center">
            Registro de arma
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              id="code"
              name="code"
              label="Código"
              helperText={
                errors.code && touched.code
                  ? errors.code
                  : 'Digite el código del arma'
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
                  : 'Digite el tipo del arma'
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
                  : 'Digite la marca del arma'
              }
              error={!!(errors.mark && touched.mark)}
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
                  : 'Digite el modelo del arma'
              }
              error={!!(errors.model && touched.model)}
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
                  : 'Digite el calibre del arma'
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
                  : 'Digite el número de serie del arma'
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
                errors.lot && touched.lot
                  ? errors.lot
                  : 'Digite el lote del arma'
              }
              error={!!(errors.lot && touched.lot)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <TextField
              id="numberOfProviders"
              name="numberOfProviders"
              label="Número de proveedores"
              helperText={
                errors.numberOfProviders && touched.numberOfProviders
                  ? errors.numberOfProviders
                  : 'Digite el numero de proveedores del arma'
              }
              error={!!(errors.numberOfProviders && touched.numberOfProviders)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <TextField
              id="providerCapacity"
              name="providerCapacity"
              label="Capacidad del proveedor"
              helperText={
                errors.providerCapacity && touched.providerCapacity
                  ? errors.providerCapacity
                  : 'Digite la capacidad del proveedor del arma'
              }
              error={!!(errors.providerCapacity && touched.providerCapacity)}
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
                  : 'Digite la cantidad disponible del arma'
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
              Registrar arma
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

export default withStyles(formStyles)(RegisterWeapon);
