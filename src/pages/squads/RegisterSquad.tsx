import { WithStyles, withStyles } from '@material-ui/core';
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
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { formStyles } from 'common/styles';
import CircularLoader from 'components/loading/CircularLoader';
import { useFormik } from 'formik';
import { getPeopleByRole } from 'modules/people/Service';
import {
  apiError as peopleApiError,
  loadingPeople,
  loadPeople,
  selectPeople,
  selectUiStatus as selectPeopleUiStatus,
} from 'modules/people/Slice';
import { getSquadrons } from 'modules/squadrons/Service';
import {
  apiError as squadronsApiError,
  loadingSquadrons,
  loadSquadrons,
  selectSquadrons,
  selectUiStatus as selectSquadronsUiStatus,
} from 'modules/squadrons/Slice';
import { CreateSquadRequest } from 'modules/squads/Models';
import { checkExists, createSquad } from 'modules/squads/Service';
import {
  apiError,
  registeredCorrectly,
  resetRegister,
  selectError,
  selectWasRegistered,
} from 'modules/squads/Slice';
import React, { ReactElement, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

const registerSquadScheme = Yup.object().shape({
  code: Yup.string()
    .required('Este campo es requerido')
    .test(
      'CheckExists',
      'Ya esxite una escuadra con el código digitado',
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
      dispatch(resetRegister());
    }
  }, [dispatch, history, wasRegistered]);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingSquadrons());
        const result = await getSquadrons();
        dispatch(loadSquadrons(result));
      } catch (err) {
        dispatch(squadronsApiError(err.message));
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingPeople());
        const result = await getPeopleByRole('SquadLeader');
        dispatch(loadPeople(result));
      } catch (err) {
        dispatch(peopleApiError(err.message));
      }
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
      try {
        await createSquad(values);
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
                defaultValue=""
                fullWidth
              >
                {squadronsUiStatus === 'loading' && (
                  <MenuItem value="">
                    <CircularLoader size={40} message="Cargando escuadrillas" />
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
                defaultValue=""
                fullWidth
              >
                {peopleUiStatus === 'loading' && (
                  <MenuItem value="">
                    <CircularLoader
                      size={40}
                      message="Cargando jefes de escuadras"
                    />
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
