import { FormHelperText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select, { SelectChangeEvent } from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AdapterMoment from '@material-ui/lab/AdapterMoment';
import DatePicker from '@material-ui/lab/DatePicker';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import { WithStyles } from '@material-ui/styles';
import withStyles from '@material-ui/styles/withStyles';
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
  CreateWarMaterialAndSpecialEquipmentAssigmentFormatRequest,
  DocMovement,
  Purpose,
  Warehouse,
} from 'modules/formats/war-material-and-special-equipment-assignment/Models';
import { createWarMaterialAndSpecialEquipmentAssigmentFormat } from 'modules/formats/war-material-and-special-equipment-assignment/Service';
import {
  AmmunitionAndQuantity,
  EquipmentAndQuantity,
  ExplosiveAndQuantity,
} from 'modules/formats/war-material-delivery-certificate/Models';
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
import EquipmentAndQuantitySelectionDialog from 'pages/formats/components/EquipmentsAndQuantitySelectionDialog';
import ExplosivesAndQuantitySelectionDialog from 'pages/formats/components/ExplosivesAndQuantitySelectionDialog';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';

export type RegisterWarMaterialAndSpecialEquipmentAssigmentFormatProps =
  WithStyles<typeof formStyles>;

const RegisterWarMaterialAndSpecialEquipmentAssigmentFormatSchema =
  Yup.object().shape({
    code: Yup.string().required('Este campo es requerido'),
    validity: Yup.date().required('Este campo es requerido'),
    place: Yup.string().required('Este campo es requerido'),
    squadronCode: Yup.string().required('Este campo es requerido'),
    squadCode: Yup.string().required('Este campo es requerido'),
    troopId: Yup.string().required('Este campo es requerido'),
    warehouse: Yup.number().required('Este campo es requerido'),
    purpose: Yup.number().required('Este campo es requerido'),
    docMovement: Yup.number().required('Este campo es requerido'),
    physicalLocation: Yup.string().required('Este campo es requerido'),
    others: Yup.string().required('Este campo es requerido'),
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

const RegisterWarMaterialAndSpecialEquipmentAssigmentFormat = (
  props: RegisterWarMaterialAndSpecialEquipmentAssigmentFormatProps,
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

  const registerWarMaterialAndSpecialEquipmentAssigmentFormatForm =
    useFormik<CreateWarMaterialAndSpecialEquipmentAssigmentFormatRequest>({
      initialValues: {
        code: '',
        validity: moment(),
        place: '',
        date: moment(),
        squadronCode: '',
        squadCode: '',
        troopId: '',
        warehouse: Warehouse.Air,
        purpose: Purpose.Instruction,
        docMovement: DocMovement.Consumption,
        physicalLocation: '',
        others: '',
        weapons: [],
        ammunition: [],
        equipments: [],
        explosives: [],
      },
      validationSchema:
        RegisterWarMaterialAndSpecialEquipmentAssigmentFormatSchema,
      onSubmit: async values => {
        try {
          const result =
            await createWarMaterialAndSpecialEquipmentAssigmentFormat(values);
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
  } = registerWarMaterialAndSpecialEquipmentAssigmentFormatForm;

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

    registerWarMaterialAndSpecialEquipmentAssigmentFormatForm.setFieldValue(
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
      registerWarMaterialAndSpecialEquipmentAssigmentFormatForm.setFieldValue(
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
      registerWarMaterialAndSpecialEquipmentAssigmentFormatForm.setFieldValue(
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
      registerWarMaterialAndSpecialEquipmentAssigmentFormatForm.setFieldValue(
        'explosives',
        [...values.explosives, item],
      );
    }
  };

  return (
    <>
      <Helmet>Armería | Registra formato de asignación</Helmet>
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
        <LinearProgress hidden={!isSubmitting} />
        <div className={classes.contentWrapper}>
          <Typography variant="h5" align="center">
            Registro de formato de asignación
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
                    registerWarMaterialAndSpecialEquipmentAssigmentFormatForm.setFieldValue(
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
            <Grid
              container
              alignContent="center"
              spacing={3}
              justifyContent="center"
            >
              <Grid item xs>
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
                  <FormHelperText
                    error={!!(errors.warehouse && touched.warehouse)}
                  >
                    {errors.warehouse && touched.warehouse
                      ? errors.warehouse
                      : 'Seleccione un almacén de armamento'}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl className={classes.formField} fullWidth>
                  <InputLabel id="select-purpose-label">Finalidad</InputLabel>
                  <Select
                    id="purpose"
                    name="purpose"
                    labelId="select-purpose-label"
                    error={!!(errors.purpose && touched.purpose)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    defaultValue={Purpose.Instruction}
                    fullWidth
                  >
                    <MenuItem value={Purpose.Instruction}>Intrucción</MenuItem>
                    <MenuItem value={Purpose.Operations}>Operaciones</MenuItem>
                    <MenuItem value={Purpose.Verification}>
                      Comprobación
                    </MenuItem>
                  </Select>
                  <FormHelperText error={!!(errors.purpose && touched.purpose)}>
                    {errors.purpose && touched.purpose
                      ? errors.purpose
                      : 'Seleccione una finalidad'}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl className={classes.formField} fullWidth>
                  <InputLabel id="select-docMovement-label">
                    Doc movimiento
                  </InputLabel>
                  <Select
                    id="docMovement"
                    name="docMovement"
                    labelId="select-docMovement-label"
                    error={!!(errors.docMovement && touched.docMovement)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    defaultValue={DocMovement.Return}
                    fullWidth
                  >
                    <MenuItem value={DocMovement.Return}>Devolución</MenuItem>
                    <MenuItem value={DocMovement.Consumption}>Consumo</MenuItem>
                  </Select>
                  <FormHelperText
                    error={!!(errors.docMovement && touched.docMovement)}
                  >
                    {errors.docMovement && touched.docMovement
                      ? errors.docMovement
                      : 'Seleccione un doc movimiento'}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <TextField
              id="physicalLocation"
              name="physicalLocation"
              label="Locación física"
              helperText={
                errors.physicalLocation && touched.physicalLocation
                  ? errors.physicalLocation
                  : 'Digite la locación física del formato'
              }
              error={!!(errors.physicalLocation && touched.physicalLocation)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <TextField
              id="others"
              name="others"
              label="Otros"
              helperText={
                errors.others && touched.others
                  ? errors.others
                  : 'Digite otra información'
              }
              error={!!(errors.others && touched.others)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <FormControl className={classes.formField} fullWidth>
              <InputLabel id="select-weapons-label">Armas</InputLabel>
              <Select
                id="weapons"
                name="weapons"
                labelId="select-weapons-label"
                multiple
                value={values.weapons}
                renderValue={selected => (selected as string[]).join(', ')}
                input={<Input />}
                error={!!(errors.weapons && touched.weapons)}
                onChange={handleSelectWeapon}
                onBlur={handleBlur}
                disabled={isSubmitting}
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
  RegisterWarMaterialAndSpecialEquipmentAssigmentFormat,
);
