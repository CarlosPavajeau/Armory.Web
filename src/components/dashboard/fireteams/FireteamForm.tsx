import { LoadingButton } from '@mui/lab';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ApiErrors from 'components/feedback/ApiErrors';
import SelectFlightField from 'components/forms/SelectFlightField';
import CircularLoader from 'components/loading/CircularLoader';
import Consola from 'consola';
import { Form, FormikProvider, useFormik } from 'formik';
import { CreateFireTeamRequest } from 'modules/fireteams/models';
import FireTeamsService from 'modules/fireteams/service';
import { usePeopleByRank } from 'modules/people/hooks';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const FireteamForm = (): ReactElement => {
  const [people, peopleUiStatus] = usePeopleByRank('Comandante de Escuadra');

  const RegisterFireteamScheme = Yup.object().shape({
    code: Yup.string().required('Este campo es requerido'),
    name: Yup.string().required('Este campo es requerido'),
    flightCode: Yup.string().required('Este campo es requerido'),
    personId: Yup.string().required('Este campo es requerido'),
  });

  const navigate = useNavigate();
  const formik = useFormik<CreateFireTeamRequest>({
    initialValues: {
      code: '',
      name: '',
      flightCode: '',
      personId: '',
    },
    validationSchema: RegisterFireteamScheme,
    onSubmit: async values => {
      try {
        await FireTeamsService.create(values);
        navigate('/dashboard/fireteams/all');
      } catch (err: unknown) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
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
            placeholder="Ejemplo: EFAC"
            helperText={
              errors.code && touched.code
                ? errors.code
                : 'Digite el código de la escuadra'
            }
            error={!!(errors.code && touched.code)}
            disabled={isSubmitting}
            {...getFieldProps('code')}
            fullWidth
          />

          <TextField
            label="Nombre"
            placeholder="Ejemplo: Escuadra de guerra"
            helperText={
              errors.name && touched.name
                ? errors.name
                : 'Digite el nombre de la escuadra'
            }
            error={!!(errors.name && touched.name)}
            disabled={isSubmitting}
            {...getFieldProps('name')}
            fullWidth
          />

          <SelectFlightField
            disabled={isSubmitting}
            {...getFieldProps('flightCode')}
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
              fullWidth
            >
              {peopleUiStatus === 'loading' && (
                <MenuItem value="">
                  <CircularLoader
                    size={40}
                    message="Cargando comandantes de escuadras"
                  />
                </MenuItem>
              )}
              {people &&
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
                : 'Seleccione un comandante de escuadra'}
            </FormHelperText>
          </FormControl>

          <ApiErrors />

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Registrar escuadra
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default FireteamForm;
