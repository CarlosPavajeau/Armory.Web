import { LoadingButton } from '@mui/lab';
import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ApiErrors from 'components/feedback/ApiErrors';
import CircularLoader from 'components/loading/CircularLoader';
import { Form, FormikProvider, useFormik } from 'formik';
import { useAmmunition } from 'modules/armament/ammunition/hooks';
import { AmmunitionAndQuantity } from 'modules/formats/war-material-delivery-certificate/Models';
import React, { ReactElement } from 'react';
import * as Yup from 'yup';

interface AmmunitionAndQuantityFormProps {
  onSuccess: (item: AmmunitionAndQuantity | null) => void;
}

const AmmunitionAndQuantityForm = (
  props: AmmunitionAndQuantityFormProps,
): ReactElement => {
  const { onSuccess } = props;
  const [ammunition, ammunitionUiStatus] = useAmmunition();

  const AmmunitionAndQuantitySchema = Yup.object().shape({
    ammunitionCode: Yup.string().required('Este campo es requerido'),
    quantity: Yup.number()
      .required('Este campo es requerido')
      .min(1, 'Se debe digitar mínimo una munición'),
  });

  const formik = useFormik<AmmunitionAndQuantity>({
    initialValues: {
      ammunitionCode: '',
      quantity: 0,
    },
    validationSchema: AmmunitionAndQuantitySchema,
    onSubmit: values => {
      onSuccess(values);
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel id="ammunitionCode-label">Munición</InputLabel>
            <Select
              labelId="ammunitionCode-label"
              label="Munición"
              error={!!(errors.ammunitionCode && touched.ammunitionCode)}
              disabled={isSubmitting}
              defaultValue=""
              {...getFieldProps('ammunitionCode')}
            >
              {ammunitionUiStatus === 'loading' && (
                <MenuItem value="">
                  <CircularLoader size={40} message="Cargando municiones" />
                </MenuItem>
              )}
              {ammunitionUiStatus === 'apiError' && (
                <MenuItem value="">No hay datos</MenuItem>
              )}
              {ammunitionUiStatus === 'loaded' &&
                ammunition &&
                ammunition.length > 0 &&
                ammunition.map(s => {
                  return (
                    <MenuItem value={s.code} key={s.code}>
                      {s.code}
                    </MenuItem>
                  );
                })}
            </Select>
            <FormHelperText
              error={!!(errors.ammunitionCode && touched.ammunitionCode)}
            >
              {errors.ammunitionCode && touched.ammunitionCode
                ? errors.ammunitionCode
                : 'Seleccione una munición'}
            </FormHelperText>
          </FormControl>

          <TextField
            label="Cantidad"
            helperText={
              errors.quantity && touched.quantity
                ? errors.quantity
                : 'Digite la cantidad de munición'
            }
            error={!!(errors.quantity && touched.quantity)}
            disabled={isSubmitting}
            {...getFieldProps('quantity')}
            fullWidth
          />

          <ApiErrors />

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Agregar
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default AmmunitionAndQuantityForm;