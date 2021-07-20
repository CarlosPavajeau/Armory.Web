import { ReactElement, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { FormHelperText, withStyles, WithStyles } from '@material-ui/core';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import CircularLoader from '../../components/loading/CircularLoader';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { formStyles } from '../../common/styles';
import { CreateSquadronRequest } from '../../modules/squadrons/Models';
import { createSquadron } from '../../modules/squadrons/Service';
import {
  resetRegister,
  selectError,
  selectWasRegistered,
} from '../../modules/squadrons/Slice';
import { selectPeople, selectUiStatus } from '../../modules/people/Slice';
import { getPeopleByRole } from '../../modules/people/Service';

const registerSquadronScheme = Yup.object().shape({
  code: Yup.string().required('Este campo es requerido'),
  name: Yup.string().required('Este campo es requerido'),
  personId: Yup.string().required('Este campo es requerido'),
});

export type RegisterSquadronProps = WithStyles<typeof formStyles>;

const RegisterSquadron = (props: RegisterSquadronProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const people = useAppSelector(selectPeople);
  const peopleUiState = useAppSelector(selectUiStatus);
  const registerError = useAppSelector(selectError);
  const wasRegistered = useAppSelector(selectWasRegistered);

  const history = useHistory();
  useEffect(() => {
    if (wasRegistered) {
      history.push('/dashboard/squadrons');
      dispatch(resetRegister());
    }
  }, [dispatch, history, wasRegistered]);

  useEffect(() => {
    (async () => {
      await getPeopleByRole('SquadronLeader', dispatch);
    })();
  }, [dispatch]);

  const registerSquadronForm = useFormik<CreateSquadronRequest>({
    initialValues: {
      code: '',
      name: '',
      personId: '',
    },
    validationSchema: registerSquadronScheme,
    onSubmit: async (values: CreateSquadronRequest) => {
      await createSquadron(values, dispatch);
    },
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = registerSquadronForm;

  return (
    <>
      <Helmet>
        <title>Armería | Registrar escuadrilla</title>
      </Helmet>
      <Paper className={classes.paper}>
        <LinearProgress hidden={!isSubmitting} />
        <div className={classes.contentWrapper}>
          <Typography variant="h5" align="center">
            Registrar escuadrilla
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              id="code"
              name="code"
              label="Código"
              placeholder="Ejemplo: 3AFF"
              helperText={
                errors.code && touched.code
                  ? errors.code
                  : 'Digite el código de la escuadrilla'
              }
              error={!!(errors.code && touched.code)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <TextField
              id="name"
              name="name"
              label="Nombre"
              placeholder="Ejemplo: Escuadrilla de cacería"
              helperText={
                errors.name && touched.name
                  ? errors.name
                  : 'Digite el nombre de la escuadrilla'
              }
              error={!!(errors.name && touched.name)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <FormControl className={classes.formField} fullWidth>
              <InputLabel id="select-person-label">
                Persona encargada
              </InputLabel>
              <Select
                id="personId"
                name="personId"
                labelId="select-person-label"
                error={!!(errors.personId && touched.personId)}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                fullWidth
              >
                {peopleUiState === 'loading' && (
                  <MenuItem value="">
                    <CircularLoader
                      size={40}
                      message="Cargando jefes de escuadrilla"
                    />
                  </MenuItem>
                )}
                {peopleUiState === 'loaded' &&
                  people &&
                  people.map(p => {
                    return (
                      <MenuItem value={p.id} key={p.id}>
                        {p.firstName} {p.secondName} {p.lastName}{' '}
                        {p.secondLastName}
                      </MenuItem>
                    );
                  })}
              </Select>
              <FormHelperText error={!!(errors.personId && touched.personId)}>
                {errors.personId && touched.personId
                  ? errors.personId
                  : 'Seleccione la persona cargo de la escuadrilla'}
              </FormHelperText>
            </FormControl>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isSubmitting}
              fullWidth
            >
              Registrar escuadrilla
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

export default withStyles(formStyles)(RegisterSquadron);
