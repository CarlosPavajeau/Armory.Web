import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles, WithStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
import Button from '@material-ui/core/Button';
import { formStyles } from '../../common/styles';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import {
  selectSquadrons,
  selectUiStatus as selectSquadronsUiStatus,
} from '../../modules/squadrons/Slice';
import {
  resetRegister,
  selectError,
  selectWasRegistered,
} from '../../modules/squads/Slice';
import { getSquadrons } from '../../modules/squadrons/Service';
import { CreateSquadRequest } from '../../modules/squads/Models';
import { createSquad } from '../../modules/squads/Service';
import {
  selectPeople,
  selectUiStatus as selectPeopleUiStatus,
} from '../../modules/people/Slice';
import { getPeopleByRole } from '../../modules/people/Service';

const registerSquadScheme = Yup.object().shape({
  code: Yup.string().required('Este campo es requerido'),
  name: Yup.string().required('Este campo es requerido'),
  squadronCode: Yup.string().required('Este campo es requerido'),
  personId: Yup.string().required('Este campo es requerido'),
});

export type RegisterSquadProps = WithStyles<typeof formStyles>;

const RegisterSquad = (props: RegisterSquadProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const squadrons = useAppSelector(selectSquadrons);
  const squadronsUiStatus = useAppSelector(selectSquadronsUiStatus);
  const people = useAppSelector(selectPeople);
  const peopleUiStatus = useAppSelector(selectPeopleUiStatus);

  const registerError = useAppSelector(selectError);
  const wasRegistered = useAppSelector(selectWasRegistered);

  const history = useHistory();
  useEffect(() => {
    if (wasRegistered) {
      history.push('/dashboard/squads');
    }
  }, [history, wasRegistered]);

  useEffect(() => {
    dispatch(resetRegister());
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await getSquadrons(dispatch);
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await getPeopleByRole('SquadLeader', dispatch);
    })();
  }, [dispatch]);

  const registerSquadForm = useFormik<CreateSquadRequest>({
    initialValues: {
      code: '',
      name: '',
      squadronCode: '',
      personId: '',
    },
    validationSchema: registerSquadScheme,
    onSubmit: async values => {
      await createSquad(values, dispatch);
    },
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = registerSquadForm;

  return (
    <>
      <Helmet>
        <title>Armería | Registrar escuadra</title>
      </Helmet>
      <Paper className={classes.paper}>
        <LinearProgress hidden={!isSubmitting} />
        <div className={classes.contentWrapper}>
          <Typography variant="h5" align="center">
            Registro de escuadra
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              id="code"
              name="code"
              label="Código"
              placeholder="Ejemplo: EFAC"
              helperText={
                errors.code && touched.code
                  ? errors.code
                  : 'Digite el código de la escuadra'
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
              placeholder="Ejemplo: Escuadra de guerra"
              helperText={
                errors.name && touched.name
                  ? errors.name
                  : 'Digite el nombre de la escuadra'
              }
              error={!!(errors.name && touched.name)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <FormControl className={classes.formField} fullWidth>
              <InputLabel id="select-squadron-label">
                Escuadrilla a la que pertenece
              </InputLabel>
              <Select
                id="squadronCode"
                name="squadronCode"
                labelId="select-squadron-label"
                error={!!(errors.squadronCode && touched.squadronCode)}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                fullWidth
              >
                {squadronsUiStatus === 'loading' && (
                  <MenuItem value="">
                    <Grid
                      container
                      spacing={2}
                      direction="column"
                      alignItems="center"
                    >
                      <Grid item xs>
                        <CircularProgress />
                      </Grid>
                      <Grid item xs>
                        <Typography>Cargando escuadrillas</Typography>
                      </Grid>
                    </Grid>
                  </MenuItem>
                )}
                {squadronsUiStatus === 'loaded' &&
                  squadrons &&
                  squadrons.map(p => {
                    return (
                      <MenuItem value={p.code} key={p.code}>
                        {p.name}
                      </MenuItem>
                    );
                  })}
              </Select>
              <FormHelperText
                error={!!(errors.squadronCode && touched.squadronCode)}
              >
                {errors.squadronCode && touched.squadronCode
                  ? errors.squadronCode
                  : 'Seleccione la persona cargo de la escuadrilla'}
              </FormHelperText>
            </FormControl>
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
                {peopleUiStatus === 'loading' && (
                  <MenuItem value="">
                    <Grid
                      container
                      spacing={2}
                      direction="column"
                      alignItems="center"
                    >
                      <Grid item xs>
                        <CircularProgress />
                      </Grid>
                      <Grid item xs>
                        <Typography>Cargando jefes de escuadras</Typography>
                      </Grid>
                    </Grid>
                  </MenuItem>
                )}
                {peopleUiStatus === 'loaded' &&
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
              Registrar escuadra
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

export default withStyles(formStyles)(RegisterSquad);
