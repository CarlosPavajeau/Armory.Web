import { ReactElement, useEffect } from 'react';
import { withStyles, WithStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import LinearProgress from '@material-ui/core/LinearProgress';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import CircularLoader from '../../components/loading/CircularLoader';
import { formStyles } from '../../common/styles';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import {
  resetRegister,
  selectError,
  selectWasRegistered,
} from '../../modules/degrees/Slice';
import {
  selectRanks,
  selectUiStatus as selectRanksUiStatus,
} from '../../modules/ranks/Slice';
import { CreateDegreeRequest } from '../../modules/degrees/Models';
import { createDegree } from '../../modules/degrees/Service';
import { getRanks } from '../../modules/ranks/Service';

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

  const history = useHistory();
  useEffect(() => {
    if (wasRegistered) {
      history.push('/dashboard/degrees');
    }
  }, [history, wasRegistered]);

  useEffect(() => {
    dispatch(resetRegister());
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await getRanks(dispatch);
    })();
  }, [dispatch]);

  const registerDegreeForm = useFormik<CreateDegreeRequest>({
    initialValues: {
      name: '',
      rankId: 0,
    },
    validationSchema: registerDegreeSchema,
    onSubmit: async values => {
      await createDegree(values, dispatch);
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
