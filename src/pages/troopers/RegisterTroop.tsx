import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
import FormHelperText from '@material-ui/core/FormHelperText';
import { formStyles } from '../../common/styles';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { CreateTroopRequest } from '../../modules/troopers/Models';
import { checkExists, createTroop } from '../../modules/troopers/Service';
import { getSquads } from '../../modules/squads/Service';
import { getRanks } from '../../modules/ranks/Service';
import { getDegreesByRank } from '../../modules/degrees/Service';
import {
  registeredCorrectly,
  resetRegister,
  selectError,
  selectWasRegistered,
} from '../../modules/troopers/Slice';
import {
  selectUiStatus as selectSquadsUiStatus,
  selectSquads,
  loadingSquads,
  loadSquads,
} from '../../modules/squads/Slice';
import {
  selectUiStatus as selectRanksUiStatus,
  selectRanks,
  loadingRanks,
  loadRanks,
} from '../../modules/ranks/Slice';
import {
  selectUiStatus as selectDegreesUiStatus,
  selectDegrees,
  loadingDegrees,
  loadDegrees,
} from '../../modules/degrees/Slice';
import CircularLoader from '../../components/loading/CircularLoader';

const registerTroopSchema = Yup.object().shape({
  id: Yup.string()
    .required('Este campo es requerido')
    .test(
      'CheckExists',
      'Ya existe un tropa con la indentificación digitada',
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
  firstName: Yup.string().required('Este campo es requerido'),
  secondName: Yup.string().required('Este campo es requerido'),
  lastName: Yup.string().required('Este campo es requerido'),
  secondLastName: Yup.string().required('Este campo es requerido'),
  squadCode: Yup.string().required('Este campo es requerido'),
  degreeId: Yup.number().required('Este campo es requerido'),
  rankId: Yup.number().required('Este campo es requerido'),
});

export type RegisterTroopProps = WithStyles<typeof formStyles>;

export interface RegisterTroopFormValues extends CreateTroopRequest {
  rankId: number;
}

const RegisterTroop = (props: RegisterTroopProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const squads = useAppSelector(selectSquads);
  const squadsUiStatus = useAppSelector(selectSquadsUiStatus);
  const ranks = useAppSelector(selectRanks);
  const ranksUiStatus = useAppSelector(selectRanksUiStatus);
  const degrees = useAppSelector(selectDegrees);
  const degreesUiStatus = useAppSelector(selectDegreesUiStatus);

  const registerError = useAppSelector(selectError);
  const wasRegistered = useAppSelector(selectWasRegistered);

  const history = useHistory();
  useEffect(() => {
    if (wasRegistered) {
      history.push('/dashboard/troopers');
      dispatch(resetRegister());
    }
  }, [dispatch, history, wasRegistered]);

  useEffect(() => {
    (async () => {
      dispatch(loadingSquads());
      const result = await getSquads();
      dispatch(loadSquads(result));
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      dispatch(loadingRanks());
      const result = await getRanks();
      dispatch(loadRanks(result));
    })();
  }, [dispatch]);

  const registerTroopForm = useFormik<RegisterTroopFormValues>({
    initialValues: {
      id: '',
      firstName: '',
      secondName: '',
      lastName: '',
      secondLastName: '',
      squadCode: '',
      degreeId: 0,
      rankId: 0,
    },
    validationSchema: registerTroopSchema,
    onSubmit: async values => {
      await createTroop(values);
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
    values,
  } = registerTroopForm;

  useEffect(() => {
    if (values.rankId && values.rankId !== 0) {
      (async () => {
        dispatch(loadingDegrees());
        const result = await getDegreesByRank(values.rankId);
        dispatch(loadDegrees(result));
      })();
    }
  }, [dispatch, values.rankId]);

  return (
    <>
      <Helmet>
        <title>Armería | Registro de tropa</title>
      </Helmet>
      <Paper className={classes.paper}>
        <LinearProgress hidden={!isSubmitting} />
        <div className={classes.contentWrapper}>
          <Typography variant="h5" align="center">
            Registro de tropa
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              id="id"
              name="id"
              label="Identificación"
              placeholder="Ejemplo: 1007870931"
              helperText={
                errors.id && touched.id
                  ? errors.id
                  : 'Digite la identificación de la tropa'
              }
              error={!!(errors.id && touched.id)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              required
              fullWidth
            />
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="Primer nombre"
                  placeholder="Ejemplo: Manolo"
                  helperText={
                    errors.firstName && touched.firstName
                      ? errors.firstName
                      : 'Digite el primer nombre de la tropa'
                  }
                  error={!!(errors.firstName && touched.firstName)}
                  className={classes.formField}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="secondName"
                  name="secondName"
                  label="Segundo nombre"
                  placeholder="Ejemplo: Pedro"
                  helperText={
                    errors.secondName && touched.secondName
                      ? errors.secondName
                      : 'Digite el segundo nombre de la tropa'
                  }
                  error={!!(errors.secondName && touched.secondName)}
                  className={classes.formField}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Primer apellido"
                  placeholder="Ejemplo: Perez"
                  helperText={
                    errors.lastName && touched.lastName
                      ? errors.lastName
                      : 'Digite el primer apellido de la tropa'
                  }
                  error={!!(errors.lastName && touched.lastName)}
                  className={classes.formField}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="secondLastName"
                  name="secondLastName"
                  label="Segundo apellido"
                  placeholder="Ejemplo: Pedro"
                  helperText={
                    errors.secondLastName && touched.secondLastName
                      ? errors.secondLastName
                      : 'Digite el segundo apellido de la tropa'
                  }
                  error={!!(errors.secondLastName && touched.secondLastName)}
                  className={classes.formField}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  fullWidth
                />
              </Grid>
            </Grid>
            <FormControl className={classes.formField} fullWidth>
              <InputLabel id="select-squad-label">
                Escuadra de la tropa
              </InputLabel>
              <Select
                id="squadCode"
                name="squadCode"
                labelId="select-squad-label"
                error={!!(errors.squadCode && touched.squadCode)}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                defaultValue=""
                required
                fullWidth
              >
                {squadsUiStatus === 'loading' && (
                  <MenuItem value="">
                    <CircularLoader size={40} message="Cargando escuadras" />
                  </MenuItem>
                )}
                {squadsUiStatus === 'loaded' &&
                  squads &&
                  squads.map(squad => {
                    return (
                      <MenuItem value={squad.code} key={squad.code}>
                        {squad.name}
                      </MenuItem>
                    );
                  })}
              </Select>
              <FormHelperText error={!!(errors.squadCode && touched.squadCode)}>
                {errors.squadCode && touched.squadCode
                  ? errors.squadCode
                  : 'Seleccione el escuadron al que pertenece la tropa'}
              </FormHelperText>
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formField} fullWidth>
                  <InputLabel id="select-rank-label">
                    Rango de la tropa
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
                    required
                    fullWidth
                  >
                    {ranksUiStatus === 'loading' && (
                      <MenuItem value="">
                        <CircularLoader size={40} message="Cargando rangos" />
                      </MenuItem>
                    )}
                    {ranksUiStatus === 'loaded' &&
                      ranks &&
                      ranks.map(rank => {
                        return (
                          <MenuItem value={rank.id} key={rank.id}>
                            {rank.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  <FormHelperText error={!!(errors.rankId && touched.rankId)}>
                    {errors.rankId && touched.rankId
                      ? errors.rankId
                      : 'Seleccione el rango al que pertenece la tropa'}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formField} fullWidth>
                  <InputLabel id="select-degree-label">
                    Grado de la tropa
                  </InputLabel>
                  <Select
                    id="degreeId"
                    name="degreeId"
                    labelId="select-degree-label"
                    error={!!(errors.degreeId && touched.degreeId)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    defaultValue=""
                    required
                    fullWidth
                  >
                    {(degreesUiStatus === 'idle' ||
                      (!!values.rankId && values.rankId === 0)) && (
                      <MenuItem value="">Seleccione un rango primero</MenuItem>
                    )}
                    {degreesUiStatus === 'loading' && (
                      <MenuItem value="">
                        <CircularLoader size={40} message="Cargando grados" />
                      </MenuItem>
                    )}
                    {degreesUiStatus === 'loaded' &&
                      degrees &&
                      degrees.map(degree => {
                        return (
                          <MenuItem value={degree.id} key={degree.id}>
                            {degree.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  <FormHelperText
                    error={!!(errors.degreeId && touched.degreeId)}
                  >
                    {errors.degreeId && touched.degreeId
                      ? errors.degreeId
                      : 'Seleccione el grado de la tropa'}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isSubmitting}
              fullWidth
            >
              Registrar tropa
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

export default withStyles(formStyles)(RegisterTroop);
