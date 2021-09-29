import { LoadingButton } from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Button from '@mui/material/Button';
import { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AmmunitionEquipmentsExplosivesInfoTab from 'components/dashboard/formats/AmmunitionEquipmentsExplosivesInfoTab';
import ApiErrors from 'components/feedback/ApiErrors';
import SelectFireteamField from 'components/forms/SelectFireteamField';
import SelectFlightField from 'components/forms/SelectFlightField';
import SelectSquadField from 'components/forms/SelectSquadField';
import SelectTroopField from 'components/forms/SelectTroopField';
import SelectWeaponsField from 'components/forms/SelectWeaponsField';
import Fallback from 'components/routes/Fallback';
import Consola from 'consola';
import FileSaver from 'file-saver';
import { Form, FormikProvider, useFormik } from 'formik';
import {
  AmmunitionAndQuantity,
  CreateWarMaterialDeliveryCertificateFormatRequest,
  EquipmentAndQuantity,
  ExplosiveAndQuantity,
} from 'modules/formats/war-material-delivery-certificate/Models';
import { createWarMaterialDeliveryCertificateFormat } from 'modules/formats/war-material-delivery-certificate/Service';
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

const WarMaterialDeliveryCertificateFormatForm = (): ReactElement => {
  const RegisterWarMaterialDeliveryCertificateFormatSchema = Yup.object().shape(
    {
      code: Yup.string().required('Este campo es requerido'),
      validity: Yup.date().required('Este campo es requerido'),
      place: Yup.string().required('Este campo es requerido'),
      squadCode: Yup.string().required('Este campo es requerido'),
      flightCode: Yup.string().required('Este campo es requerido'),
      fireteamCode: Yup.string().required('Este campo es requerido'),
      troopId: Yup.string().required('Este campo es requerido'),
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
    },
  );

  const navigate = useNavigate();
  const formik = useFormik<CreateWarMaterialDeliveryCertificateFormatRequest>({
    initialValues: {
      code: '',
      validity: moment(),
      place: '',
      date: moment(),
      squadCode: '',
      flightCode: '',
      fireteamCode: '',
      troopId: '',
      weapons: [],
      ammunition: [],
      equipments: [],
      explosives: [],
    },
    validationSchema: RegisterWarMaterialDeliveryCertificateFormatSchema,
    onSubmit: async values => {
      try {
        const result = await createWarMaterialDeliveryCertificateFormat(values);
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
            <SelectFireteamField
              flightCode={values.flightCode}
              disabled={isSubmitting}
              {...getFieldProps('fireteamCode')}
            />
          </Stack>

          <SelectTroopField
            fireteamCode={values.fireteamCode}
            disabled={isSubmitting}
            {...getFieldProps('troopId')}
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

export default WarMaterialDeliveryCertificateFormatForm;
