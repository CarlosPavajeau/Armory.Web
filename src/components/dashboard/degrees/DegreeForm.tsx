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
import { CreateDegreeRequest } from 'modules/degrees/Models';
import { createDegree } from 'modules/degrees/Service';
import { useRanks } from 'modules/ranks/hooks';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const DegreeForm = (): ReactElement => {
  const [ranks, ranksUiStatus] = useRanks();

  const RegisterDegreeSchema = Yup.object().shape({
    name: Yup.string().required('Este campo es requerido'),
    rankId: Yup.number().required('Este campo es requerido'),
  });

  const navigate = useNavigate();
  const formik = useFormik<CreateDegreeRequest>({
    initialValues: {
      name: '',
      rankId: 0,
    },
    validationSchema: RegisterDegreeSchema,
    onSubmit: async values => {
      try {
        await createDegree(values);
        navigate('/dashboard/degrees/all');
      } catch (err) {
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
            label="Nombre"
            placeholder="Ejemplo: Soldado"
            helperText={
              errors.name && touched.name
                ? errors.name
                : 'Digite el nombre del grado'
            }
            error={!!(errors.name && touched.name)}
            disabled={isSubmitting}
            {...getFieldProps('name')}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel id="rank-label">Cargo de operación</InputLabel>
            <Select
              labelId="rank-label"
              label="Cargo de operación"
              error={!!(errors.rankId && touched.rankId)}
              disabled={isSubmitting}
              defaultValue=""
              {...getFieldProps('rankId')}
            >
              {ranksUiStatus === 'loading' && (
                <MenuItem value="">
                  <CircularLoader
                    size={40}
                    message="Cargando cargos de operación"
                  />
                </MenuItem>
              )}
              {ranksUiStatus === 'loaded' &&
                ranks &&
                ranks.length > 0 &&
                ranks.map(r => {
                  return (
                    <MenuItem value={r.id} key={r.id}>
                      {r.name}
                    </MenuItem>
                  );
                })}
            </Select>
            <FormHelperText error={!!(errors.rankId && touched.rankId)}>
              {errors.rankId && touched.rankId
                ? errors.rankId
                : 'Seleccione un cargo de operación'}
            </FormHelperText>
          </FormControl>

          <ApiErrors />

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Registrar grado
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default DegreeForm;
