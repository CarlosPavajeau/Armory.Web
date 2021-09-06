import AdapterMoment from '@mui/lab/AdapterMoment';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Fade } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import LinearProgress from '@mui/material/LinearProgress';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { formStyles } from 'common/styles';
import CircularLoader from 'components/loading/CircularLoader';
import FileSaver from 'file-saver';
import { useFormik } from 'formik';
import { getWeapons } from 'modules/armament/weapons/Service';
import {
  loadingWeapons,
  loadWeapons,
  selectUiStatus as selectWeaponsUiStatus,
  selectWeapons,
} from 'modules/armament/weapons/Slice';
import {
  AmmunitionAndQuantity,
  CreateWarMaterialDeliveryCertificateFormatRequest,
  EquipmentAndQuantity,
  ExplosiveAndQuantity,
} from 'modules/formats/war-material-delivery-certificate/Models';
import { createWarMaterialDeliveryCertificateFormat } from 'modules/formats/war-material-delivery-certificate/Service';
import { getSquadrons } from 'modules/squadrons/Service';
import {
  loadingSquadrons,
  loadSquadrons,
  selectSquadrons,
  selectUiStatus as selectSquadronsUiStatus,
} from 'modules/squadrons/Slice';
import { getSquadsBySquadron } from 'modules/squads/Service';
import {
  loadingSquads,
  loadSquads,
  selectSquads,
  selectUiStatus as selectSquadsUiStatus,
} from 'modules/squads/Slice';
import { getTroopersBySquad } from 'modules/troopers/Service';
import {
  loadingTroopers,
  loadTroopers,
  selectTroopers,
  selectUiStatus as selectTroopersUiStatus,
} from 'modules/troopers/Slice';
import moment from 'moment';
import AmmunitionAndQuantitySelectionDialog from 'pages/formats/components/AmmunitionAndQuantitySelectionDialog';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';

import EquipmentAndQuantitySelectionDialog from '../components/EquipmentsAndQuantitySelectionDialog';
import ExplosivesAndQuantitySelectionDialog from '../components/ExplosivesAndQuantitySelectionDialog';

export type RegisterWarMaterialDeliveryCertificateFormatPros = WithStyles<
  typeof formStyles
>;

const RegisterWarMaterialDeliveryCertificateFormatSchema = Yup.object().shape({
  code: Yup.string().required('Este campo es requerido'),
  validity: Yup.date().required('Este campo es requerido'),
  place: Yup.string().required('Este campo es requerido'),
  squadronCode: Yup.string().required('Este campo es requerido'),
  squadCode: Yup.string().required('Este campo es requerido'),
  troopId: Yup.string().required('Este campo es requerido'),
  weapons: Yup.array(Yup.string())
    .required('Este campo es requerido')
    .min(1, 'Se debe seleccionar al menos un arma'),
  ammunition: Yup.array()
    .of(
      Yup.object().shape({
        ammunitionCode: Yup.string(),
        quantity: Yup.number(),
      }),
    )
    .required('Este campo es requerido')
    .min(1, 'Se debe seleccionar al menos un arma'),
  equipments: Yup.array()
    .of(
      Yup.object().shape({
        equipmentsCode: Yup.string(),
        quantity: Yup.number(),
      }),
    )
    .required('Este campo es requerido')
    .min(1, 'Se debe seleccionar al menos un arma'),
  explosives: Yup.array()
    .of(
      Yup.object().shape({
        explosiveCode: Yup.string(),
        quantity: Yup.number(),
      }),
    )
    .required('Este campo es requerido')
    .min(1, 'Se debe seleccionar al menos un arma'),
});

const RegisterWarMaterialDeliveryCertificateFormat = (
  props: RegisterWarMaterialDeliveryCertificateFormatPros,
): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const squadrons = useAppSelector(selectSquadrons);
  const squadronsUiStatus = useAppSelector(selectSquadronsUiStatus);
  const squads = useAppSelector(selectSquads);
  const squadsUiStatus = useAppSelector(selectSquadsUiStatus);
  const troopers = useAppSelector(selectTroopers);
  const troopersUiStatus = useAppSelector(selectTroopersUiStatus);
  const weapons = useAppSelector(selectWeapons);
  const weaponsUiStatus = useAppSelector(selectWeaponsUiStatus);

  // const registerError = useAppSelector(selectError);
  // const wasRegistered = useAppSelector(selectWasRegistered);

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

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingWeapons());
        const result = await getWeapons();
        dispatch(loadWeapons(result));
      } catch (err) {
        // Ignore error
      }
    })();
  }, [dispatch]);

  const registerWarMaterialDeliveryCertificateFormatForm =
    useFormik<CreateWarMaterialDeliveryCertificateFormatRequest>({
      initialValues: {
        code: '',
        validity: moment(),
        place: '',
        date: moment(),
        squadronCode: '',
        squadCode: '',
        troopId: '',
        weapons: [],
        ammunition: [],
        equipments: [],
        explosives: [],
      },
      validationSchema: RegisterWarMaterialDeliveryCertificateFormatSchema,
      onSubmit: async values => {
        try {
          const result = await createWarMaterialDeliveryCertificateFormat(
            values,
          );
          FileSaver.saveAs(result, `format-${values.code}.xlsx`);
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
  } = registerWarMaterialDeliveryCertificateFormatForm;

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
  }, [values.squadronCode, fetchSquads]);

  const fetchTroops = useCallback(
    async (squadCode: string) => {
      try {
        dispatch(loadingTroopers());
        const result = await getTroopersBySquad(squadCode);
        dispatch(loadTroopers(result));
      } catch (err) {
        // Ignore err
      }
    },
    [dispatch],
  );

  useEffect(() => {
    (async () => {
      if (values.squadCode) {
        await fetchTroops(values.squadCode);
      }
    })();
  }, [fetchTroops, values.squadCode]);

  const handleSelectWeapon = (
    event: SelectChangeEvent<typeof values.weapons>,
  ) => {
    const {
      target: { value },
    } = event;

    registerWarMaterialDeliveryCertificateFormatForm.setFieldValue(
      'weapons',
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const [ammunitionAndQuantityOpen, setAmmunitionAndQuantityOpen] =
    useState(false);
  const [equipmentsAndQuantityOpen, setEquipmentsAndQuantityOpen] =
    useState(false);
  const [explosivesAndQuantityOpen, setExplosivesAndQuantityOpen] =
    useState(false);

  const handleAmmunitionAndQuantityClose = (
    item: AmmunitionAndQuantity | null,
  ) => {
    setAmmunitionAndQuantityOpen(false);
    if (item != null) {
      registerWarMaterialDeliveryCertificateFormatForm.setFieldValue(
        'ammunition',
        [...values.ammunition, item],
      );
    }
  };

  const handleEquipmentsAndQuantityClose = (
    item: EquipmentAndQuantity | null,
  ) => {
    setEquipmentsAndQuantityOpen(false);
    if (item != null) {
      registerWarMaterialDeliveryCertificateFormatForm.setFieldValue(
        'equipments',
        [...values.equipments, item],
      );
    }
  };

  const handleExplosivesAndQuantityClose = (
    item: ExplosiveAndQuantity | null,
  ) => {
    setExplosivesAndQuantityOpen(false);
    if (item != null) {
      registerWarMaterialDeliveryCertificateFormatForm.setFieldValue(
        'explosives',
        [...values.explosives, item],
      );
    }
  };

  return (
    <>
      <Helmet>Armería | Registrar formato de acta</Helmet>
      <AmmunitionAndQuantitySelectionDialog
        open={ammunitionAndQuantityOpen}
        onClose={handleAmmunitionAndQuantityClose}
      />
      <EquipmentAndQuantitySelectionDialog
        open={equipmentsAndQuantityOpen}
        onClose={handleEquipmentsAndQuantityClose}
      />
      <ExplosivesAndQuantitySelectionDialog
        open={explosivesAndQuantityOpen}
        onClose={handleExplosivesAndQuantityClose}
      />
      <Paper className={classes.paper}>
        <Fade in={isSubmitting}>
          <LinearProgress />
        </Fade>
        <div className={classes.contentWrapper}>
          <Typography variant="h5" align="center">
            Registro de formato de acta
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
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Vigencia"
                value={values.validity}
                className={classes.formField}
                onChange={value => {
                  if (value) {
                    registerWarMaterialDeliveryCertificateFormatForm.setFieldValue(
                      'validity',
                      value,
                    );
                  }
                }}
                disabled={isSubmitting}
                renderInput={params => (
                  <TextField
                    helperText={
                      errors.validity && touched.validity
                        ? errors.validity
                        : 'Digite la vigencia del formato'
                    }
                    error={!!(errors.validity && touched.validity)}
                    fullWidth
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
            <TextField
              id="place"
              name="place"
              label="Lugar"
              helperText={
                errors.place && touched.place
                  ? errors.place
                  : 'Digite el lugar del formato'
              }
              error={!!(errors.place && touched.place)}
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
              <InputLabel id="select-troopId-label">Tropa</InputLabel>
              <Select
                id="troopId"
                name="troopId"
                labelId="select-troopId-label"
                error={!!(errors.troopId && touched.troopId)}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                defaultValue=""
                fullWidth
              >
                {troopersUiStatus === 'loading' && (
                  <MenuItem value="">
                    <CircularLoader size={40} message="Cargando tropas" />
                  </MenuItem>
                )}
                {troopersUiStatus === 'apiError' && (
                  <MenuItem value="">No hay datos</MenuItem>
                )}
                {troopersUiStatus === 'loaded' &&
                  troopers &&
                  troopers.map(s => {
                    return (
                      <MenuItem value={s.id} key={s.id}>
                        {s.id} - {s.firstName} {s.secondName} {s.lastName}{' '}
                        {s.secondLastName}
                      </MenuItem>
                    );
                  })}
                {troopers && troopers.length === 0 && (
                  <MenuItem value="">No hay datos</MenuItem>
                )}
              </Select>
              <FormHelperText error={!!(errors.troopId && touched.troopId)}>
                {errors.troopId && touched.troopId
                  ? errors.troopId
                  : 'Seleccione una tropa'}
              </FormHelperText>
            </FormControl>
            <FormControl className={classes.formField} fullWidth>
              <InputLabel id="select-weapons-label">Armas</InputLabel>
              <Select
                id="weapons"
                name="weapons"
                labelId="select-weapons-label"
                value={values.weapons}
                renderValue={selected => (selected as string[]).join(', ')}
                input={<Input />}
                error={!!(errors.weapons && touched.weapons)}
                onChange={handleSelectWeapon}
                onBlur={handleBlur}
                disabled={isSubmitting}
                multiple
                fullWidth
              >
                {weaponsUiStatus === 'loading' && (
                  <MenuItem value="">
                    <CircularLoader size={40} message="Cargando armas" />
                  </MenuItem>
                )}
                {weaponsUiStatus === 'apiError' && (
                  <MenuItem value="">No hay datos</MenuItem>
                )}
                {weaponsUiStatus === 'loaded' &&
                  weapons &&
                  weapons.map(s => {
                    return (
                      <MenuItem value={s.code} key={s.code}>
                        {s.code}
                      </MenuItem>
                    );
                  })}
                {weapons && weapons.length === 0 && (
                  <MenuItem value="">No hay datos</MenuItem>
                )}
              </Select>
              <FormHelperText error={!!(errors.weapons && touched.weapons)}>
                {errors.weapons && touched.weapons
                  ? errors.weapons
                  : 'Seleccione una(s) arma'}
              </FormHelperText>
            </FormControl>
            <Grid
              container
              alignContent="center"
              spacing={2}
              justifyContent="center"
            >
              <Grid item>
                <Button
                  color="primary"
                  onClick={() => setAmmunitionAndQuantityOpen(true)}
                >
                  Añadir munición
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  onClick={() => setEquipmentsAndQuantityOpen(true)}
                >
                  Añadir equipo
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  onClick={() => setExplosivesAndQuantityOpen(true)}
                >
                  Añadir explosivo
                </Button>
              </Grid>
            </Grid>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.submitButton}
              fullWidth
            >
              Generar formato
            </Button>
          </form>
        </div>
      </Paper>
    </>
  );
};

export default withStyles(formStyles)(
  RegisterWarMaterialDeliveryCertificateFormat,
);
