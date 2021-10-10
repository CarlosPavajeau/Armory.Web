import { LoadingButton } from '@mui/lab';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ApiErrors from 'components/feedback/ApiErrors';
import CircularLoader from 'components/loading/CircularLoader';
import Consola from 'consola';
import { Form, FormikProvider, useFormik } from 'formik';
import { usePeopleByRank } from 'modules/people/hooks';
import { CreateSquadRequest } from 'modules/squads/models';
import SquadsService from 'modules/squads/service';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const SquadForm = (): ReactElement => {
  const [people, peopleUiStatus] = usePeopleByRank('Comandante de Escuadrón');

  const RegisterSquadScheme = Yup.object().shape({
    code: Yup.string().required('Este campo es requerido'),
    name: Yup.string().required('Este campo es requerido'),
    personId: Yup.string().required('Este campo es requerido'),
  });

  const navigate = useNavigate();
  const formik = useFormik<CreateSquadRequest>({
    initialValues: {
      code: '',
      name: '',
      personId: '',
    },
    validationSchema: RegisterSquadScheme,
    onSubmit: async values => {
      try {
        await SquadsService.create(values);
        navigate('/dashboard/squads/all');
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
                : 'Digite el código del escuadrón'
            }
            error={!!(errors.code && touched.code)}
            disabled={isSubmitting}
            {...getFieldProps('code')}
            fullWidth
          />

          <TextField
            label="Nombre"
            helperText={
              errors.name && touched.name
                ? errors.name
                : 'Digite el nombre del escuadrón'
            }
            error={!!(errors.name && touched.name)}
            disabled={isSubmitting}
            {...getFieldProps('name')}
            fullWidth
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
                    message="Cargando comandantes de escuadrones"
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
                : 'Seleccione un comandante del escuadrón'}
            </FormHelperText>
          </FormControl>

          <ApiErrors />

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Registrar escuadrón
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default SquadForm;
