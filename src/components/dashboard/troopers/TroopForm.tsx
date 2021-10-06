import { LoadingButton } from '@mui/lab';
import { InputLabel, Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useAppDispatch } from 'common/hooks';
import ApiErrors from 'components/feedback/ApiErrors';
import SelectDegreeField from 'components/forms/SelectDegreeField';
import SelectRankField from 'components/forms/SelectRankField';
import CircularLoader from 'components/loading/CircularLoader';
import { Form, FormikProvider, useFormik } from 'formik';
import { useFireteams } from 'modules/fireteams/hooks';
import { CreateTroopRequest } from 'modules/troopers/models';
import { createTroop } from 'modules/troopers/service';
import { apiError, registeredCorrectly } from 'modules/troopers/slice';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

interface RegisterTroopFormValues extends CreateTroopRequest {
  rankId: number;
}

const TroopForm = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [fireteams, fireteamsUiStatus] = useFireteams();

  const navigate = useNavigate();
  const RegisterTroopSchema = Yup.object().shape({
    id: Yup.string()
      .required('Este campo es requerido')
      .min(8, 'Debe digital mínimo 8 caracteres')
      .max(10, 'Solo se permiten 10 caracteres'),
    firstName: Yup.string().required('Este campo es requerido'),
    secondName: Yup.string().required('Este campo es requerido'),
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
    onSubmit: async values => {
      try {
        await createTroop(values);
        dispatch(registeredCorrectly());
        navigate('/dashboard/troopers', { replace: true });
      } catch (err: unknown) {
        dispatch(apiError((err as Error).message));
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
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Primer nombre"
              placeholder="Ejemplo: Manolo"
              helperText={touched.firstName && errors.firstName}
              error={!!(errors.firstName && touched.firstName)}
              disabled={isSubmitting}
              {...getFieldProps('firstName')}
              required
              fullWidth
            />
            <TextField
              label="Segundo nombre"
              placeholder="Ejemplo: Pedro"
              helperText={touched.secondName && errors.secondName}
              error={!!(errors.secondName && touched.secondName)}
              disabled={isSubmitting}
              {...getFieldProps('secondName')}
              fullWidth
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Primer apellido"
              placeholder="Ejemplo: Perez"
              helperText={touched.lastName && errors.lastName}
              error={!!(errors.lastName && touched.lastName)}
              disabled={isSubmitting}
              {...getFieldProps('lastName')}
              required
              fullWidth
            />
            <TextField
              label="Segundo apellido"
              placeholder="Ejemplo: Pedro"
              helperText={touched.secondLastName && errors.secondLastName}
              error={!!(errors.secondLastName && touched.secondLastName)}
              {...getFieldProps('secondLastName')}
              disabled={isSubmitting}
              fullWidth
            />
          </Stack>

          <FormControl fullWidth>
            <InputLabel id="fireteamCode-label">Escuadra</InputLabel>
            <Select
              labelId="fireteamCode-label"
              label="Escuadra"
              error={!!(errors.fireteamCode && touched.fireteamCode)}
              defaultValue=""
              {...getFieldProps('fireteamCode')}
            >
              {fireteamsUiStatus === 'loading' && (
                <MenuItem value="">
                  <CircularLoader size={40} message="Cargando escuadras" />
                </MenuItem>
              )}
              {fireteamsUiStatus === 'loaded' &&
                fireteams &&
                fireteams.length > 0 &&
                fireteams.map(fireteam => {
                  const { code, name } = fireteam;
                  return (
                    <MenuItem key={code} value={code}>
                      {name}
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
