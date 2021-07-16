import { ReactElement, useEffect } from 'react';
import { withStyles, WithStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import { formStyles } from '../../common/styles';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import {
  resetRegister,
  selectError,
  selectWasRegistered,
} from '../../modules/ranks/Slice';
import { CreateRankRequest } from '../../modules/ranks/Models';
import { createRank } from '../../modules/ranks/Service';

export type RegisterRankProps = WithStyles<typeof formStyles>;

const registerRankSchema = Yup.object().shape({
  name: Yup.string().required('Este campo es requerido'),
});

const RegisterRank = (props: RegisterRankProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();

  const registerError = useAppSelector(selectError);
  const wasRegistered = useAppSelector(selectWasRegistered);

  const history = useHistory();
  useEffect(() => {
    if (wasRegistered) {
      history.push('/dashboard/ranks');
    }
  }, [history, wasRegistered]);

  useEffect(() => {
    dispatch(resetRegister());
  }, [dispatch]);

  const registerRankForm = useFormik<CreateRankRequest>({
    initialValues: {
      name: '',
    },
    validationSchema: registerRankSchema,
    onSubmit: async values => {
      await createRank(values, dispatch);
    },
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = registerRankForm;

  return (
    <>
      <Helmet>
        <title>Armería | Registrar rango</title>
      </Helmet>
      <Paper className={classes.paper}>
        <LinearProgress hidden={!isSubmitting} />
        <div className={classes.contentWrapper}>
          <Typography variant="h5" align="center">
            Registro de rango
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              id="name"
              name="name"
              label="Nombre"
              placeholder="Ejemplo: Estudiante"
              helperText={
                errors.name && touched.name
                  ? errors.name
                  : 'Digite el nombre del rango'
              }
              error={!!(errors.name && touched.name)}
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
              Registrar rango
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

export default withStyles(formStyles)(RegisterRank);
