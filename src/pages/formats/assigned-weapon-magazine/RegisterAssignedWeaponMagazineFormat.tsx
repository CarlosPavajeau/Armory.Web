import { ReactElement, useCallback, useEffect } from 'react';
import { FormHelperText, withStyles, WithStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import CircularLoader from '../../../components/loading/CircularLoader';
import { useAppDispatch, useAppSelector } from '../../../common/hooks';
import { formStyles } from '../../../common/styles';
import {
  registeredCorrectly,
  resetRegister,
  selectError,
  selectWasRegistered,
} from '../../../modules/formats/assigned-weapon-magazine/Slice';
import { CreateAssignedWeaponMagazineFormatRequest } from '../../../modules/formats/assigned-weapon-magazine/Models';
import { createAssignedWeaponMagazineFormat } from '../../../modules/formats/assigned-weapon-magazine/Service';
import { Warehouse } from '../../../modules/formats/war-material-and-special-equipment-assignment/Models';
import {
  loadingSquadrons,
  loadSquadrons,
  selectSquadrons,
  selectUiStatus as selectSquadronsUiStatus,
} from '../../../modules/squadrons/Slice';
import {
  loadingSquads,
  loadSquads,
  selectSquads,
  selectUiStatus as selectSquadsUiStatus,
} from '../../../modules/squads/Slice';
import { getSquadrons } from '../../../modules/squadrons/Service';
import { getSquadsBySquadron } from '../../../modules/squads/Service';

export type RegisterAssignedWeaponMagazineFormatProps = WithStyles<
  typeof formStyles
>;

const registerAssignedWeaponMagazineFormatSchema = Yup.object().shape({
  code: Yup.string().required('Este campo es requerido'),
  validity: Yup.date().required('Este campo es requerido'),
  squadronCode: Yup.string().required('Este campo es requerido'),
  squadCode: Yup.string().required('Este campo es requerido'),
  warehouse: Yup.number().required('Este campo es requerido'),
  comments: Yup.string(),
});

const RegisterAssignedWeaponMagazineFormat = (
  props: RegisterAssignedWeaponMagazineFormatProps,
): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const squadrons = useAppSelector(selectSquadrons);
  const squadronsUiStatus = useAppSelector(selectSquadronsUiStatus);
  const squads = useAppSelector(selectSquads);
  const squadsUiStatus = useAppSelector(selectSquadsUiStatus);

  const registerError = useAppSelector(selectError);
  const wasRegistered = useAppSelector(selectWasRegistered);

  const history = useHistory();
  useEffect(() => {
    if (wasRegistered) {
      history.push('/dashboard');
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
        // Ignore error
      }
    })();
  }, [dispatch]);

  const registerAssignedWeaponMagazineFormatForm =
    useFormik<CreateAssignedWeaponMagazineFormatRequest>({
      initialValues: {
        code: '',
        validity: new Date(),
        squadronCode: '',
        squadCode: '',
        warehouse: Warehouse.Air,
        date: new Date(),
        comments: '',
      },
      validationSchema: registerAssignedWeaponMagazineFormatSchema,
      onSubmit: async values => {
        try {
          await createAssignedWeaponMagazineFormat(values);
          dispatch(registeredCorrectly());
        } catch (err) {
          // Ignore error
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
    values,
  } = registerAssignedWeaponMagazineFormatForm;

  const fetchSquads = useCallback(
    async (squadronCode: string) => {
      try {
        dispatch(loadingSquads());
        const result = await getSquadsBySquadron(squadronCode);
        dispatch(loadSquads(result));
      } catch (err) {
        // Ignore error
      }
    },
    [dispatch],
  );

  useEffect(() => {
    (async () => {
      if (values.squadronCode) {
        await fetchSquads(values.squadronCode);
      }
    })();
  }, [dispatch, values.squadronCode, fetchSquads]);

  return (
    <>
      <Helmet>
        <title>Armería | Registrar formato de revista</title>
      </Helmet>
      <Paper className={classes.paper}>
        <LinearProgress hidden={!isSubmitting} />
        <div className={classes.contentWrapper}>
          <Typography variant="h5" align="center">
            Registro de formato de revista
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              id="code"
              name="code"
              label="Código"
              helperText={
                errors.code && touched.code
                  ? errors.code
                  : 'Digite el código del formato'
              }
              error={!!(errors.code && touched.code)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <TextField
              id="validity"
              name="validity"
              type="date"
              label="Vigencia"
              InputLabelProps={{ shrink: true }}
              value={values.validity}
              helperText={
                errors.validity && touched.validity
                  ? errors.validity
                  : 'Digite la vigencia del formato'
              }
              error={!!(errors.validity && touched.validity)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <FormControl className={classes.formField} fullWidth>
              <InputLabel id="select-squadronCode-label">
                Escuadrilla
              </InputLabel>
              <Select
                id="squadronCode"
                name="squadronCode"
                labelId="select-squadronCode-label"
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
                {squadronsUiStatus === 'apiError' && (
                  <MenuItem value="">No hay datos</MenuItem>
                )}
                {squadronsUiStatus === 'loaded' &&
                  squadrons &&
                  squadrons.map(s => {
                    return (
                      <MenuItem value={s.code} key={s.code}>
                        {s.name}
                      </MenuItem>
                    );
                  })}
              </Select>
              <FormHelperText
                error={!!(errors.squadronCode && touched.squadronCode)}
              >
                {errors.squadronCode && touched.squadronCode
                  ? errors.squadronCode
                  : 'Seleccione una escuadrilla'}
              </FormHelperText>
            </FormControl>
            <FormControl className={classes.formField} fullWidth>
              <InputLabel id="select-squadCode-label">Escuadra</InputLabel>
              <Select
                id="squadCode"
                name="squadCode"
                labelId="select-squadCode-label"
                error={!!(errors.squadCode && touched.squadCode)}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                defaultValue=""
                fullWidth
              >
                {squadsUiStatus === 'loading' && (
                  <MenuItem value="">
                    <CircularLoader size={40} message="Cargando escuadras" />
                  </MenuItem>
                )}
                {squadsUiStatus === 'apiError' && (
                  <MenuItem value="">No hay datos</MenuItem>
                )}
                {squadsUiStatus === 'loaded' &&
                  squads &&
                  squads.map(s => {
                    return (
                      <MenuItem value={s.code} key={s.code}>
                        {s.name}
                      </MenuItem>
                    );
                  })}
                {squads && squads.length === 0 && (
                  <MenuItem value="">No hay datos</MenuItem>
                )}
              </Select>
              <FormHelperText error={!!(errors.squadCode && touched.squadCode)}>
                {errors.squadCode && touched.squadCode
                  ? errors.squadCode
                  : 'Seleccione una escuadra'}
              </FormHelperText>
            </FormControl>
            <FormControl className={classes.formField} fullWidth>
              <InputLabel id="select-warehouse-label">
                Almacén de armamento
              </InputLabel>
              <Select
                id="warehouse"
                name="warehouse"
                labelId="select-warehouse-label"
                error={!!(errors.warehouse && touched.warehouse)}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                defaultValue={Warehouse.Terrestrial}
                fullWidth
              >
                <MenuItem value={Warehouse.Terrestrial}>Terrestre</MenuItem>
                <MenuItem value={Warehouse.Air}>Aéreo</MenuItem>
              </Select>
              <FormHelperText error={!!(errors.warehouse && touched.warehouse)}>
                {errors.warehouse && touched.warehouse
                  ? errors.warehouse
                  : 'Seleccione un almacén de armamento'}
              </FormHelperText>
            </FormControl>
            <TextField
              id="comments"
              name="comments"
              label="Comentarios"
              helperText={
                errors.comments && touched.comments
                  ? errors.comments
                  : 'Digite los comentarios del formato'
              }
              error={!!(errors.comments && touched.comments)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              rows={4}
              multiline
              fullWidth
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isSubmitting}
              fullWidth
            >
              Registrar formato
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

export default withStyles(formStyles)(RegisterAssignedWeaponMagazineFormat);
