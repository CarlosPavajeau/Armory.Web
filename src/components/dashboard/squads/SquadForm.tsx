import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Stack from '@material-ui/core/Stack';
import TextField from '@material-ui/core/TextField';
import { LoadingButton } from '@material-ui/lab';
import ApiErrors from 'components/feedback/ApiErrors';
import CircularLoader from 'components/loading/CircularLoader';
import Consola from 'consola';
import { Form, FormikProvider, useFormik } from 'formik';
import { usePeopleByRole } from 'modules/people/hooks';
import { useSquadrons } from 'modules/squadrons/hooks';
import { CreateSquadRequest } from 'modules/squads/Models';
import { createSquad } from 'modules/squads/Service';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const SquadForm = (): ReactElement => {
  const [people, peopleUiStatus] = usePeopleByRole('SquadronLeader');
  const [squadrons, squadronsUiStatus] = useSquadrons();

  const RegisterSquadScheme = Yup.object().shape({
    code: Yup.string().required('Este campo es requerido'),
    name: Yup.string().required('Este campo es requerido'),
    squadronCode: Yup.string().required('Este campo es requerido'),
    personId: Yup.string().required('Este campo es requerido'),
  });

  const navigate = useNavigate();
  const formik = useFormik<CreateSquadRequest>({
    initialValues: {
      code: '',
      name: '',
      squadronCode: '',
      personId: '',
    },
    validationSchema: RegisterSquadScheme,
    onSubmit: async values => {
      try {
        await createSquad(values);
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

          <FormControl fullWidth>
            <InputLabel id="squadron-label">Escuadrilla</InputLabel>
            <Select
              labelId="squadron-label"
              label="Escuadrilla"
              error={!!(errors.squadronCode && touched.squadronCode)}
              defaultValue=""
              {...getFieldProps('squadronCode')}
              fullWidth
            >
              {squadronsUiStatus === 'loading' && (
                <MenuItem value="">
                  <CircularLoader size={40} message="Cargando escuadrillas" />
                </MenuItem>
              )}
              {squadronsUiStatus === 'loaded' &&
                squadrons.length > 0 &&
                squadrons &&
                squadrons.map(p => {
                  return (
                    <MenuItem value={p.code} key={p.code}>
                      {p.name}
                    </MenuItem>
                  );
                })}
            </Select>
            <FormHelperText
              error={!!(errors.squadronCode && touched.squadronCode)}
            >
              {errors.squadronCode && touched.squadronCode
                ? errors.squadronCode
                : 'Seleccione la escuadrilla a la que pertenece'}
            </FormHelperText>
          </FormControl>

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
              {peopleUiStatus === 'loaded' &&
                people &&
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

export default SquadForm;
