import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import ApiErrors from 'components/feedback/ApiErrors';
import { Form, FormikProvider, useFormik } from 'formik';
import { UpdateRankRequest } from 'modules/ranks/models';
import RankService from 'modules/ranks/service';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

interface UpdateRankFormProps {
  rankId: number;
}

const UpdateRankForm = (props: UpdateRankFormProps): ReactElement => {
  const { rankId } = props;

  const UpdateRankSchema = Yup.object().shape({
    id: Yup.number().required('Este campo es requerido'),
    name: Yup.string().required('Este campo es requerido'),
  });

  const navigate = useNavigate();
  const formik = useFormik<UpdateRankRequest>({
    initialValues: {
      id: rankId,
      name: '',
    },
    validationSchema: UpdateRankSchema,
    onSubmit: async value => {
      await RankService.update(value);
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
            helperText={
              errors.name && touched.name
                ? errors.name
                : 'Digite el nombre del cargo de operación'
            }
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

export default UpdateRankForm;
