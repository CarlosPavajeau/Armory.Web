import { LoadingButton } from '@mui/lab';
import { InputLabel, Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import PersonalDataForm from 'components/dashboard/people/PersonalDataForm';
import ApiErrors from 'components/feedback/ApiErrors';
import SelectDegreeField from 'components/forms/SelectDegreeField';
import SelectRankField from 'components/forms/SelectRankField';
import CircularLoader from 'components/loading/CircularLoader';
import Consola from 'consola';
import { Form, FormikProvider, useFormik } from 'formik';
import { useFireTeams } from 'modules/fireteams/hooks';
import { CreateTroopRequest } from 'modules/troopers/models';
import TroopersService from 'modules/troopers/service';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

interface RegisterTroopFormValues extends CreateTroopRequest {
  rankId: number;
}

const TroopForm = (): ReactElement => {
  const [fireTeams, fireTeamsUiStatus] = useFireTeams();

  const RegisterTroopSchema = Yup.object().shape({
    id: Yup.string()
      .required('Este campo es requerido')
      .min(8, 'Debe digital mínimo 8 caracteres')
      .max(10, 'Solo se permiten 10 caracteres'),
    firstName: Yup.string().required('Este campo es requerido'),
    secondName: Yup.string(),
    lastName: Yup.string().required('Este campo es requerido'),
    secondLastName: Yup.string().required('Este campo es requerido'),
    fireteamCode: Yup.string().required('Este campo es requerido'),
    degreeId: Yup.number()
      .required('Este campo es requerido')
      .min(1, 'Este campo es requerido'),
    rankId: Yup.number()
      .required('Este campo es requerido')
      .min(1, 'Este campo es requerido'),
  });

  const navigate = useNavigate();
  const formik = useFormik<RegisterTroopFormValues>({
    initialValues: {
      id: '',
      firstName: '',
      secondName: '',
      lastName: '',
      secondLastName: '',
      fireteamCode: '',
      degreeId: 0,
      rankId: 0,
    },
    validationSchema: RegisterTroopSchema,
    onSubmit: async value => {
      try {
        await TroopersService.create(value);
        navigate('/dashboard/troopers', { replace: true });
      } catch (err: unknown) {
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
            label="Identificación"
            placeholder="Ejemplo: 1007870931"
            helperText={touched.id && errors.id}
            error={!!(errors.id && touched.id)}
            disabled={isSubmitting}
            {...getFieldProps('id')}
            required
            fullWidth
          />

          <PersonalDataForm />

          <FormControl fullWidth>
            <InputLabel id="fireteamCode-label">Escuadra</InputLabel>
            <Select
              labelId="fireteamCode-label"
              label="Escuadra"
              error={!!(errors.fireteamCode && touched.fireteamCode)}
              defaultValue=""
              {...getFieldProps('fireteamCode')}
            >
              {fireTeamsUiStatus === 'loading' && (
                <MenuItem value="">
                  <CircularLoader size={40} message="Cargando escuadras" />
                </MenuItem>
              )}
              {fireTeams &&
                fireTeams.length > 0 &&
                fireTeams.map(fireteam => {
                  const { code, name } = fireteam;
                  return (
                    <MenuItem key={code} value={code}>
                      {code} - {name}
                    </MenuItem>
                  );
                })}
            </Select>
            <FormHelperText
              error={!!(errors.fireteamCode && touched.fireteamCode)}
            >
              {touched.fireteamCode && errors.fireteamCode}
            </FormHelperText>
          </FormControl>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <SelectRankField
              disabled={isSubmitting}
              {...getFieldProps('rankId')}
            />

            <SelectDegreeField
              rankId={values.rankId}
              disabled={isSubmitting}
              {...getFieldProps('degreeId')}
            />
          </Stack>

          <ApiErrors />

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Registrar
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default TroopForm;
