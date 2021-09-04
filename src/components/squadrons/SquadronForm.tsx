import { FormHelperText, TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Stack from '@material-ui/core/Stack';
import { LoadingButton } from '@material-ui/lab';
import { useAppDispatch } from 'common/hooks';
import ApiErrors from 'components/feedback/ApiErrors';
import CircularLoader from 'components/loading/CircularLoader';
import { Form, FormikProvider, useFormik } from 'formik';
import { usePeopleByRole } from 'modules/people/hooks';
import { CreateSquadronRequest } from 'modules/squadrons/Models';
import { createSquadron } from 'modules/squadrons/Service';
import { apiError, registeredCorrectly } from 'modules/squadrons/Slice';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const SquadronForm = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [people, peopleUiState] = usePeopleByRole('SquadronLeader');
  const navigate = useNavigate();

  const RegisterSquadronScheme = Yup.object().shape({
    code: Yup.string().required('Este campo es requerido'),
    name: Yup.string().required('Este campo es requerido'),
    personId: Yup.string().required('Este campo es requerido'),
  });

  const formik = useFormik<CreateSquadronRequest>({
    initialValues: {
      code: '',
      name: '',
      personId: '',
    },
    validationSchema: RegisterSquadronScheme,
    onSubmit: async (values: CreateSquadronRequest) => {
      try {
        await createSquadron(values);
        dispatch(registeredCorrectly());
        navigate('/dashboard/squadrons/all');
      } catch (err: unknown) {
        dispatch(apiError((err as Error).message));
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

export default SquadronForm;
