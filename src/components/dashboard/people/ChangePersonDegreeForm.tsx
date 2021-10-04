import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import ApiErrors from 'components/feedback/ApiErrors';
import SelectDegreeField from 'components/forms/SelectDegreeField';
import SelectRankField from 'components/forms/SelectRankField';
import Consola from 'consola';
import { Form, FormikProvider, useFormik } from 'formik';
import { UpdatePersonDegreeRequest } from 'modules/people/models';
import { updatePersonDegree } from 'modules/people/service';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

interface ChangePersonDegreeFormValues extends UpdatePersonDegreeRequest {
  rankId: number;
}

interface ChangePersonDegreeFormProps {
  personId: string;
}

const ChangePersonDegreeForm = (
  props: ChangePersonDegreeFormProps,
): ReactElement => {
  const { personId } = props;

  const ChangePersonDegreeSchema = Yup.object().shape({
    id: Yup.string().required(),
    degreeId: Yup.number()
      .required('Este campo es requerido')
      .min(1, 'Este campo es requerido'),
    rankId: Yup.number()
      .required('Este campo es requerido')
      .min(1, 'Este campo es requerido'),
  });

  const navigate = useNavigate();
  const formik = useFormik<ChangePersonDegreeFormValues>({
    initialValues: {
      id: personId,
      rankId: 0,
      degreeId: 0,
    },
    validationSchema: ChangePersonDegreeSchema,
    onSubmit: async values => {
      try {
        await updatePersonDegree(values);
        navigate('/dashboard');
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
      }
    },
  });

  const { handleSubmit, isSubmitting, getFieldProps, values } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <SelectRankField
            disabled={isSubmitting}
            {...getFieldProps('rankId')}
          />
          <SelectDegreeField
            rankId={values.rankId}
            disabled={isSubmitting}
            {...getFieldProps('degreeId')}
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

export default ChangePersonDegreeForm;
