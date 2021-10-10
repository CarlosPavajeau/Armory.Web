import { LoadingButton } from '@mui/lab';
import { FormHelperText, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import ApiErrors from 'components/feedback/ApiErrors';
import SelectSquadField from 'components/forms/SelectSquadField';
import CircularLoader from 'components/loading/CircularLoader';
import Consola from 'consola';
import { Form, FormikProvider, useFormik } from 'formik';
import { CreateFlightRequest } from 'modules/flights/models';
import FlightsService from 'modules/flights/service';
import { usePeopleByRank } from 'modules/people/hooks';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const FlightForm = (): ReactElement => {
  const [people, peopleUiState] = usePeopleByRank('Comandante de Escuadrilla');

  const RegisterFlightScheme = Yup.object().shape({
    code: Yup.string().required('Este campo es requerido'),
    name: Yup.string().required('Este campo es requerido'),
    personId: Yup.string().required('Este campo es requerido'),
    squadCode: Yup.string().required('Este campo es requerido'),
  });

  const navigate = useNavigate();
  const formik = useFormik<CreateFlightRequest>({
    initialValues: {
      code: '',
      name: '',
      personId: '',
      squadCode: '',
    },
    validationSchema: RegisterFlightScheme,
    onSubmit: async (values: CreateFlightRequest) => {
      try {
        await FlightsService.create(values);
        navigate('/dashboard/flights/all');
      } catch (err: unknown) {
        Consola.error(err);
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Código"
            placeholder="Ejemplo: 3AFF"
            helperText={
              errors.code && touched.code
                ? errors.code
                : 'Digite el código de la escuadrilla'
            }
            error={!!(errors.code && touched.code)}
            disabled={isSubmitting}
            {...getFieldProps('code')}
            fullWidth
          />
          <TextField
            label="Nombre"
            placeholder="Ejemplo: Escuadrilla de cacería"
            helperText={
              errors.name && touched.name
                ? errors.name
                : 'Digite el nombre de la escuadrilla'
            }
            error={!!(errors.name && touched.name)}
            disabled={isSubmitting}
            {...getFieldProps('name')}
            fullWidth
          />

          <SelectSquadField
            disabled={isSubmitting}
            {...getFieldProps('squadCode')}
          />

          <FormControl fullWidth>
            <InputLabel id="person-label">Comandante</InputLabel>
            <Select
              labelId="person-label"
              label="Comandante"
              error={!!(errors.personId && touched.personId)}
              disabled={isSubmitting}
              defaultValue=""
              {...getFieldProps('personId')}
            >
              {peopleUiState === 'loading' && (
                <MenuItem value="">
                  <CircularLoader
                    size={40}
                    message="Cargando comandantes de escuadrilla"
                  />
                </MenuItem>
              )}
              {peopleUiState === 'loaded' &&
                people &&
                people.length > 0 &&
                people.map(p => {
                  const {
                    id,
                    firstName,
                    secondName,
                    lastName,
                    secondLastName,
                  } = p;
                  return (
                    <MenuItem value={id} key={id}>
                      {firstName} {secondName} {lastName} {secondLastName}
                    </MenuItem>
                  );
                })}
            </Select>
            <FormHelperText error={!!(errors.personId && touched.personId)}>
              {errors.personId && touched.personId
                ? errors.personId
                : 'Seleccione el comandante de la escuadrilla'}
            </FormHelperText>
          </FormControl>

          <ApiErrors />

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Registrar escuadrilla
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default FlightForm;
