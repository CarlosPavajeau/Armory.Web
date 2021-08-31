import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/styles';
import withStyles from '@material-ui/styles/withStyles';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { formStyles } from 'common/styles';
import FileSaver from 'file-saver';
import { useFormik } from 'formik';
import { CreateWeaponRequest } from 'modules/armament/weapons/Models';
import { checkExists, createWeapon } from 'modules/armament/weapons/Service';
import {
  apiError,
  registeredCorrectly,
  resetRegister,
  selectError,
  selectWasRegistered,
} from 'modules/armament/weapons/Slice';
import { ReactElement, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const registerWeaponSchema = Yup.object().shape({
  code: Yup.string()
    .required('Este campo es requerido')
    .test('CheckExists', 'Ya existe un arma con el código digitado', value => {
      return new Promise(resolve => {
        if (value === undefined || value === '') {
          resolve(true);
          return;
        }

        checkExists(value || '')
          .then(result => resolve(!result))
          .catch(() => resolve(true));
      });
    }),
  type: Yup.string().required('Este campo es requerido'),
  mark: Yup.string().required('Este campo es requerido'),
  model: Yup.string().required('Este campo es requerido'),
  caliber: Yup.string().required('Este campo es requerido'),
  series: Yup.string().required('Este campo es requerido'),
  lot: Yup.string().required('Este campo es requerido'),
  numberOfProviders: Yup.number().required('Este campo es requerido'),
  providerCapacity: Yup.number().required('Este campo es requerido'),
});

export type RegisterWeaponProps = WithStyles<typeof formStyles>;

const RegisterWeapon = (props: RegisterWeaponProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();

  const registerError = useAppSelector(selectError);
  const wasRegistered = useAppSelector(selectWasRegistered);

  const history = useNavigate();
  useEffect(() => {
    if (wasRegistered) {
      history('/dashboard/weapons');
      dispatch(resetRegister());
    }
  }, [dispatch, history, wasRegistered]);

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
    },
    validationSchema: registerWeaponSchema,
    onSubmit: async values => {
      try {
        const result = await createWeapon(values);
        FileSaver.saveAs(result, `qr-${values.code}.pdf`);
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
