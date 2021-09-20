import { LoadingButton } from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ApiErrors from 'components/feedback/ApiErrors';
import SelectFireteamField from 'components/forms/SelectFireteamField';
import SelectFlightField from 'components/forms/SelectFlightField';
import SelectSquadField from 'components/forms/SelectSquadField';
import Consola from 'consola';
import { Form, FormikProvider, useFormik } from 'formik';
import { CreateAssignedWeaponMagazineFormatRequest } from 'modules/formats/assigned-weapon-magazine/Models';
import { createAssignedWeaponMagazineFormat } from 'modules/formats/assigned-weapon-magazine/Service';
import { Warehouse } from 'modules/formats/war-material-and-special-equipment-assignment/Models';
import moment from 'moment';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const AssignedWeaponMagazineFormatForm = (): ReactElement => {
  const RegisterAssignedWeaponMagazineFormatSchema = Yup.object().shape({
    code: Yup.string().required('Este campo es requerido'),
    validity: Yup.date().required('Este campo es requerido'),
    squadCode: Yup.string().required('Este campo es requerido'),
    flightCode: Yup.string().required('Este campo es requerido'),
    fireteamCode: Yup.string().required('Este campo es requerido'),
    warehouse: Yup.number().required('Este campo es requerido'),
    comments: Yup.string(),
  });

  const navigate = useNavigate();
  const formik = useFormik<CreateAssignedWeaponMagazineFormatRequest>({
    initialValues: {
      code: '',
      validity: moment(),
      squadCode: '',
      flightCode: '',
      fireteamCode: '',
      warehouse: Warehouse.Air,
      date: moment(),
      comments: '',
    },
    validationSchema: RegisterAssignedWeaponMagazineFormatSchema,
    onSubmit: async values => {
      try {
        const result = await createAssignedWeaponMagazineFormat(values);
        navigate(
          `/dashboard/formats/assigned-weapon-magazine-format/items?formatId=${result}`,
        );
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values } =
    formik;

  return (
    <FormikProvider value={formik}>
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

          <FormControl fullWidth>
            <InputLabel id="warehouse-label">Almacén de armamento</InputLabel>
            <Select
              labelId="warehouse-label"
              label="Armacén de armamento"
              error={!!(errors.warehouse && touched.warehouse)}
              disabled={isSubmitting}
              defaultValue={Warehouse.Terrestrial}
              {...getFieldProps('warehouse')}
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
            label="Comentarios"
            helperText={
              errors.comments && touched.comments
                ? errors.comments
                : 'Digite los comentarios del formato'
            }
            error={!!(errors.comments && touched.comments)}
            disabled={isSubmitting}
            rows={4}
            {...getFieldProps('comments')}
            multiline
            fullWidth
          />

          <ApiErrors />

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Registrar formato
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default AssignedWeaponMagazineFormatForm;
