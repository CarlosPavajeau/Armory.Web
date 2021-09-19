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
import CircularLoader from 'components/loading/CircularLoader';
import Consola from 'consola';
import { Form, FormikProvider, useFormik } from 'formik';
import { useFlights } from 'modules/flights/hooks';
import { CreateAssignedWeaponMagazineFormatRequest } from 'modules/formats/assigned-weapon-magazine/Models';
import { createAssignedWeaponMagazineFormat } from 'modules/formats/assigned-weapon-magazine/Service';
import { Warehouse } from 'modules/formats/war-material-and-special-equipment-assignment/Models';
import { useSquadsBySquadron } from 'modules/squads/hooks';
import moment from 'moment';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const AssignedWeaponMagazineFormatForm = (): ReactElement => {
  const [squadrons, squadronsUiStatus] = useFlights();

  const RegisterAssignedWeaponMagazineFormatSchema = Yup.object().shape({
    code: Yup.string().required('Este campo es requerido'),
    validity: Yup.date().required('Este campo es requerido'),
    squadronCode: Yup.string().required('Este campo es requerido'),
    squadCode: Yup.string().required('Este campo es requerido'),
    warehouse: Yup.number().required('Este campo es requerido'),
    comments: Yup.string(),
  });

  const navigate = useNavigate();
  const formik = useFormik<CreateAssignedWeaponMagazineFormatRequest>({
    initialValues: {
      code: '',
      validity: moment(),
      squadronCode: '',
      squadCode: '',
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

  const [squads, squadsUiStatus] = useSquadsBySquadron(values.squadronCode);

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
            <FormControl fullWidth>
              <InputLabel id="squadronCode-label">Escuadrilla</InputLabel>
              <Select
                labelId="squadronCode-label"
                label="Escuadrilla"
                error={!!(errors.squadronCode && touched.squadronCode)}
                disabled={isSubmitting}
                defaultValue=""
                {...getFieldProps('squadronCode')}
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
                  squadrons.length > 0 &&
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
            <FormControl fullWidth>
              <InputLabel id="squadCode-label">Escuadra</InputLabel>
              <Select
                labelId="squadCode-label"
                label="Escuadra"
                error={!!(errors.squadCode && touched.squadCode)}
                disabled={isSubmitting}
                defaultValue=""
                {...getFieldProps('squadCode')}
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
