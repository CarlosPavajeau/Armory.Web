import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/styles';
import withStyles from '@material-ui/styles/withStyles';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { formStyles } from 'common/styles';
import CircularLoader from 'components/loading/CircularLoader';
import { useFormik } from 'formik';
import { CreateDegreeRequest } from 'modules/degrees/Models';
import { createDegree } from 'modules/degrees/Service';
import {
  registeredCorrectly,
  resetRegister,
  selectError,
  selectWasRegistered,
} from 'modules/degrees/Slice';
import { getRanks } from 'modules/ranks/Service';
import {
  loadingRanks,
  loadRanks,
  selectRanks,
  selectUiStatus as selectRanksUiStatus,
} from 'modules/ranks/Slice';
import { ReactElement, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export type RegisterDegreeProps = WithStyles<typeof formStyles>;

const registerDegreeSchema = Yup.object().shape({
  name: Yup.string().required('Este campo es requerido'),
  rankId: Yup.number().required('Este campo es requerido'),
});

const RegisterDegree = (props: RegisterDegreeProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const ranks = useAppSelector(selectRanks);
  const ranksUiStatus = useAppSelector(selectRanksUiStatus);

  const registerError = useAppSelector(selectError);
  const wasRegistered = useAppSelector(selectWasRegistered);

  const history = useNavigate();
  useEffect(() => {
    if (wasRegistered) {
      history('/dashboard/degrees');
      dispatch(resetRegister());
    }
  }, [dispatch, history, wasRegistered]);

  useEffect(() => {
    (async () => {
      dispatch(loadingRanks());
      const result = await getRanks();
      dispatch(loadRanks(result));
    })();
  }, [dispatch]);

  const registerDegreeForm = useFormik<CreateDegreeRequest>({
    initialValues: {
      name: '',
      rankId: 0,
    },
    validationSchema: registerDegreeSchema,
    onSubmit: async values => {
      await createDegree(values);
      dispatch(registeredCorrectly());
    },
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = registerDegreeForm;

  return (
    <>
      <Helmet>
        <title>Armería | Registrar grado</title>
      </Helmet>
      <Paper className={classes.paper}>
        <LinearProgress hidden={!isSubmitting} />
        <div className={classes.contentWrapper}>
          <Typography variant="h5" align="center">
            Registro de grado
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              id="name"
              name="name"
              label="Nombre"
              placeholder="Ejemplo: Soldado"
              helperText={
                errors.name && touched.name
                  ? errors.name
                  : 'Digite el nombre del grado'
              }
              error={!!(errors.name && touched.name)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <FormControl className={classes.formField} fullWidth>
              <InputLabel id="select-rank-label">
                Rango al que pertenece
              </InputLabel>
              <Select
                id="rankId"
                name="rankId"
                labelId="select-rank-label"
                error={!!(errors.rankId && touched.rankId)}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                defaultValue=""
                fullWidth
              >
                {ranksUiStatus === 'loading' && (
                  <MenuItem value="">
                    <CircularLoader size={40} message="Cargando rangos" />
                  </MenuItem>
                )}
                {ranksUiStatus === 'loaded' &&
                  ranks &&
                  ranks.map(r => {
                    return (
                      <MenuItem value={r.id} key={r.id}>
                        {r.name}
                      </MenuItem>
                    );
                  })}
              </Select>
              <FormHelperText error={!!(errors.rankId && touched.rankId)}>
                {errors.rankId && touched.rankId
                  ? errors.rankId
                  : 'Seleccione el rango al que pertenece el grado'}
              </FormHelperText>
            </FormControl>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isSubmitting}
              fullWidth
            >
              Registrar grado
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

export default withStyles(formStyles)(RegisterDegree);
