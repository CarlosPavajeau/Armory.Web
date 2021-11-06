import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import ApiErrors from 'components/feedback/ApiErrors';
import { Form, FormikProvider, useFormik } from 'formik';
import { UpdateDegreeRequest } from 'modules/degrees/models';
import DegreesService from 'modules/degrees/service';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

interface UpdateDegreeFormPros {
  degreeId: number;
}

const UpdateDegreeForm = (props: UpdateDegreeFormPros): ReactElement => {
  const { degreeId } = props;

  const UpdateDegreeSchema = Yup.object().shape({
    id: Yup.number().required('Este campo es requerido'),
    name: Yup.string().required('Este campo es requerido'),
  });

  const navigate = useNavigate();
  const formik = useFormik<UpdateDegreeRequest>({
    initialValues: {
      id: degreeId,
      name: '',
    },
    validationSchema: UpdateDegreeSchema,
    onSubmit: async value => {
      await DegreesService.update(value);
      navigate('/dashboard');
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Nombre"
            helperText={errors.name && touched.name ? errors.name : ' '}
            error={!!(errors.name && touched.name)}
            disabled={isSubmitting}
            {...getFieldProps('name')}
            fullWidth
          />

          <ApiErrors />

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Actualizar
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default UpdateDegreeForm;
