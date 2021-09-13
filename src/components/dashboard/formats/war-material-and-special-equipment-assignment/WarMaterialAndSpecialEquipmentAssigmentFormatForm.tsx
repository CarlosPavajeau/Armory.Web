import { LoadingButton } from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { FormHelperText, OutlinedInput, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import ApiErrors from 'components/feedback/ApiErrors';
import SelectSquadField from 'components/forms/SelectSquadField';
import SelectSquadronField from 'components/forms/SelectSquadronField';
import SelectTroopField from 'components/forms/SelectTroopField';
import CircularLoader from 'components/loading/CircularLoader';
import Fallback from 'components/routes/Fallback';
import Consola from 'consola';
import FileSaver from 'file-saver';
import { Form, FormikProvider, useFormik } from 'formik';
import { useWeapons } from 'modules/armament/weapons/hooks';
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
import moment from 'moment';
import { lazy, ReactElement, Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const AmmunitionAndQuantityDialog = lazy(
  () => import('components/dashboard/formats/AmmunitionAndQuantityDialog'),
);

const EquipmentAndQuantityDialog = lazy(
  () => import('components/dashboard/formats/EquipmentAndQuantityDialog'),
);

const ExplosiveAndQuantityDialog = lazy(
  () => import('components/dashboard/formats/ExplosiveAndQuantityDialog'),
);

const WarMaterialAndSpecialEquipmentAssigmentFormatForm = (): ReactElement => {
  const [weapons, weaponsUiStatus] = useWeapons();

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
      weapons: Yup.array(Yup.string()).required('Este campo es requerido'),
      ammunition: Yup.array()
        .of(
          Yup.object().shape({
            ammunitionCode: Yup.string(),
            quantity: Yup.number(),
          }),
        )
        .required('Este campo es requerido'),
      equipments: Yup.array()
        .of(
          Yup.object().shape({
            equipmentsCode: Yup.string(),
            quantity: Yup.number(),
          }),
        )
        .required('Este campo es requerido'),
      explosives: Yup.array()
        .of(
          Yup.object().shape({
            explosiveCode: Yup.string(),
            quantity: Yup.number(),
          }),
        )
        .required('Este campo es requerido'),
    });

  const navigate = useNavigate();
  const formik =
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
          navigate('/dashboard');
        } catch (err) {
          if (process.env.NODE_ENV === 'development') {
            Consola.error(err);
          }
        }
      },
    });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values } =
    formik;

  const handleSelectWeapon = (
    event: SelectChangeEvent<typeof values.weapons>,
  ) => {
    const {
      target: { value },
    } = event;

    formik.setFieldValue(
      'weapons',
      typeof value === 'string' ? value.split(', ') : value,
    );
  };

  const [ammunitionDialogOpen, setAmmunitionDialogOpen] = useState(false);
  const handleOnCloseAmmunitionDialog = (
    item: AmmunitionAndQuantity | null,
  ) => {
    setAmmunitionDialogOpen(false);
    if (item != null) {
      formik.setFieldValue('ammunition', [...values.ammunition, item]);
    }
  };

  const [equipmentsDialogOpen, setEquipmentsDialogOpen] = useState(false);
  const handleOnCloseEquipmentsDialog = (item: EquipmentAndQuantity | null) => {
    setEquipmentsDialogOpen(false);
    if (item != null) {
      formik.setFieldValue('equipments', [...values.equipments, item]);
    }
  };

  const [explosivesDialogOpen, setExplosivesDialogOpen] = useState(false);
  const handleOnCloseExplosivesDialog = (item: ExplosiveAndQuantity | null) => {
    setExplosivesDialogOpen(false);
    if (item != null) {
      formik.setFieldValue('explosives', [...values.explosives, item]);
    }
  };

  return (
    <FormikProvider value={formik}>
      <Suspense fallback={<Fallback />}>
        {ammunitionDialogOpen ? (
          <AmmunitionAndQuantityDialog
            open={ammunitionDialogOpen}
            onClose={handleOnCloseAmmunitionDialog}
          />
        ) : null}
        {equipmentsDialogOpen ? (
          <EquipmentAndQuantityDialog
            open={equipmentsDialogOpen}
            onClose={handleOnCloseEquipmentsDialog}
          />
        ) : null}
        {explosivesDialogOpen ? (
          <ExplosiveAndQuantityDialog
            open={explosivesDialogOpen}
            onClose={handleOnCloseExplosivesDialog}
          />
        ) : null}
      </Suspense>

      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Código"
            helperText={
              errors.code && touched.code
                ? errors.code
                : 'Digite el código del formato'
            }
            error={!!(errors.code && touched.code)}
            disabled={isSubmitting}
            {...getFieldProps('code')}
            fullWidth
          />

          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Vigencia"
              value={values.validity}
              onChange={value => {
                if (value) {
                  formik.setFieldValue('validity', value);
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
            label="Lugar"
            helperText={
              errors.place && touched.place
                ? errors.place
                : 'Digite el lugar del formato'
            }
            error={!!(errors.place && touched.place)}
            disabled={isSubmitting}
            {...getFieldProps('place')}
            fullWidth
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <SelectSquadronField
              disabled={isSubmitting}
              {...getFieldProps('squadronCode')}
            />
            <SelectSquadField
              squadronCode={values.squadronCode}
              disabled={isSubmitting}
              {...getFieldProps('squadCode')}
            />
          </Stack>

          <SelectTroopField
            squadCode={values.squadCode}
            disabled={isSubmitting}
            {...getFieldProps('troopId')}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="warehouse-label">Almacén de armamento</InputLabel>
              <Select
                labelId="warehouse-label"
                label="Armacén de armamento"
                error={!!(errors.warehouse && touched.warehouse)}
                disabled={isSubmitting}
                defaultValue={Warehouse.Terrestrial}
                {...getFieldProps('warehouse')}
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
            <FormControl fullWidth>
              <InputLabel id="purpose-label">Finalidad</InputLabel>
              <Select
                labelId="purpose-label"
                label="Finalidad"
                error={!!(errors.purpose && touched.purpose)}
                disabled={isSubmitting}
                defaultValue={Purpose.Instruction}
                {...getFieldProps('purpose')}
              >
                <MenuItem value={Purpose.Instruction}>Instrucción</MenuItem>
                <MenuItem value={Purpose.Operations}>Operaciones</MenuItem>
                <MenuItem value={Purpose.Verification}>Comprobación</MenuItem>
              </Select>
              <FormHelperText error={!!(errors.purpose && touched.purpose)}>
                {errors.purpose && touched.purpose
                  ? errors.purpose
                  : 'Seleccione una finalidad'}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="docMovement-label">Doc movimiento</InputLabel>
              <Select
                labelId="docMovement-label"
                label="Doc movimiento"
                error={!!(errors.docMovement && touched.docMovement)}
                disabled={isSubmitting}
                defaultValue={DocMovement.Return}
                {...getFieldProps('docMovement')}
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
          </Stack>

          <TextField
            label="Locación física"
            helperText={
              errors.physicalLocation && touched.physicalLocation
                ? errors.physicalLocation
                : 'Digite la locación física del formato'
            }
            error={!!(errors.physicalLocation && touched.physicalLocation)}
            disabled={isSubmitting}
            {...getFieldProps('physicalLocation')}
            fullWidth
          />
          <TextField
            label="Otros"
            helperText={
              errors.others && touched.others
                ? errors.others
                : 'Digite otra información'
            }
            error={!!(errors.others && touched.others)}
            disabled={isSubmitting}
            {...getFieldProps('others')}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel id="weapons-label">Armas</InputLabel>
            <Select
              labelId="weapons-label"
              renderValue={selected => (selected as string[]).join(', ')}
              input={<OutlinedInput label="Armas" />}
              error={!!(errors.weapons && touched.weapons)}
              {...getFieldProps('weapons')}
              onChange={handleSelectWeapon}
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
                weapons.length > 0 &&
                weapons.map(weapon => {
                  const { code, type, model, caliber } = weapon;
                  return (
                    <MenuItem value={code} key={code}>
                      Código: {code}, Tipo: {type}, Modelo: {model}, Calibre:{' '}
                      {caliber}
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

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => setAmmunitionDialogOpen(true)}
              disabled={isSubmitting}
              fullWidth
            >
              Añadir munición
            </Button>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => setEquipmentsDialogOpen(true)}
              disabled={isSubmitting}
              fullWidth
            >
              Añadir equipo especial o accesorio
            </Button>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => setExplosivesDialogOpen(true)}
              disabled={isSubmitting}
              fullWidth
            >
              Añadir explosivo
            </Button>
          </Stack>

          <ApiErrors />

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Generar formato
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default WarMaterialAndSpecialEquipmentAssigmentFormatForm;
