import { LoadingButton } from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { FormHelperText, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import AmmunitionEquipmentsExplosivesInfoTab from 'components/dashboard/formats/AmmunitionEquipmentsExplosivesInfoTab';
import ApiErrors from 'components/feedback/ApiErrors';
import SelectFlightField from 'components/forms/SelectFlightField';
import SelectSquadField from 'components/forms/SelectSquadField';
import SelectWeaponsField from 'components/forms/SelectWeaponsField';
import Fallback from 'components/routes/Fallback';
import Consola from 'consola';
import FileSaver from 'file-saver';
import { Form, FormikProvider, useFormik } from 'formik';
import {
  CreateWarMaterialAndSpecialEquipmentAssigmentFormatRequest,
  DocMovement,
  Purpose,
  Warehouse,
} from 'modules/formats/war-material-and-special-equipment-assignment/models';
import { createWarMaterialAndSpecialEquipmentAssigmentFormat } from 'modules/formats/war-material-and-special-equipment-assignment/service';
import {
  AmmunitionAndQuantity,
  EquipmentAndQuantity,
  ExplosiveAndQuantity,
} from 'modules/formats/war-material-delivery-certificate/models';
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
  const RegisterWarMaterialAndSpecialEquipmentAssigmentFormatSchema =
    Yup.object().shape({
      code: Yup.string().required('Este campo es requerido'),
      validity: Yup.date().required('Este campo es requerido'),
      place: Yup.string().required('Este campo es requerido'),
      squadCode: Yup.string().required('Este campo es requerido'),
      flightCode: Yup.string().required('Este campo es requerido'),
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
        squadCode: '',
        flightCode: '',
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
          FileSaver.saveAs(
            result,
            `format-${values.code}${values.flightCode}.xlsx`,
          );
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
  const handleOnDeleteAmmunition = (ammunitionToDelete: string) => {
    const newValues = values.ammunition.filter(
      (ammo: AmmunitionAndQuantity) => {
        const { ammunitionLot } = ammo;
        return ammunitionLot !== ammunitionToDelete;
      },
    );

    formik.setFieldValue('ammunition', newValues);
  };

  const [equipmentsDialogOpen, setEquipmentsDialogOpen] = useState(false);
  const handleOnCloseEquipmentsDialog = (item: EquipmentAndQuantity | null) => {
    setEquipmentsDialogOpen(false);
    if (item != null) {
      formik.setFieldValue('equipments', [...values.equipments, item]);
    }
  };
  const handleOnDeleteEquipment = (equipmentToDelete: string) => {
    const newValues = values.equipments.filter(
      (equipment: EquipmentAndQuantity) => {
        const { equipmentSerial } = equipment;
        return equipmentSerial !== equipmentToDelete;
      },
    );

    formik.setFieldValue('equipments', newValues);
  };

  const [explosivesDialogOpen, setExplosivesDialogOpen] = useState(false);
  const handleOnCloseExplosivesDialog = (item: ExplosiveAndQuantity | null) => {
    setExplosivesDialogOpen(false);
    if (item != null) {
      formik.setFieldValue('explosives', [...values.explosives, item]);
    }
  };
  const handleOnDeleteExplosive = (explosiveToDelete: string) => {
    const newValues = values.explosives.filter(
      (explosive: ExplosiveAndQuantity) => {
        const { explosiveSerial } = explosive;
        return explosiveSerial !== explosiveToDelete;
      },
    );

    formik.setFieldValue('explosives', newValues);
  };

  return (
    <FormikProvider value={formik}>
      <Suspense fallback={<Fallback />}>
        {ammunitionDialogOpen ? (
          <AmmunitionAndQuantityDialog
            flightCode={values.flightCode}
            open={ammunitionDialogOpen}
            onClose={handleOnCloseAmmunitionDialog}
          />
        ) : null}
        {equipmentsDialogOpen ? (
          <EquipmentAndQuantityDialog
            flightCode={values.flightCode}
            open={equipmentsDialogOpen}
            onClose={handleOnCloseEquipmentsDialog}
          />
        ) : null}
        {explosivesDialogOpen ? (
          <ExplosiveAndQuantityDialog
            flightCode={values.flightCode}
            open={explosivesDialogOpen}
            onClose={handleOnCloseExplosivesDialog}
          />
        ) : null}
      </Suspense>

      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Formato No"
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
            <SelectSquadField
              disabled={isSubmitting}
              {...getFieldProps('squadCode')}
            />

            <SelectFlightField
              disabled={isSubmitting}
              {...getFieldProps('flightCode')}
            />
          </Stack>

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

          <SelectWeaponsField
            flightCode={values.flightCode}
            handleSelect={handleSelectWeapon}
            disabled={isSubmitting}
            {...getFieldProps('weapons')}
          />

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

          <AmmunitionEquipmentsExplosivesInfoTab
            ammunition={values.ammunition}
            equipments={values.equipments}
            explosives={values.explosives}
            onDeleteAmmunition={handleOnDeleteAmmunition}
            onDeleteEquipment={handleOnDeleteEquipment}
            onDeleteExplosive={handleOnDeleteExplosive}
          />

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
