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
import { useExplosivesByFlight } from 'modules/armament/explosives/hooks';
import { ExplosiveAndQuantity } from 'modules/formats/war-material-delivery-certificate/Models';
import React, { ReactElement } from 'react';
import * as Yup from 'yup';

interface ExplosiveAndQuantityFormProps {
  flightCode: string;
  onSuccess: (item: ExplosiveAndQuantity | null) => void;
}

const ExplosiveAndQuantityForm = (
  props: ExplosiveAndQuantityFormProps,
): ReactElement => {
  const { flightCode, onSuccess } = props;
  const [explosives, explosivesUiStatus] = useExplosivesByFlight(flightCode);

  const ExplosivesAndQuantitySchema = Yup.object().shape({
    explosiveSerial: Yup.string().required('Este campo es requerido'),
    quantity: Yup.number()
      .required('Este campo es requerido')
      .min(1, 'Se debe digitar mínimo un explosivo'),
  });

  const formik = useFormik<ExplosiveAndQuantity>({
    initialValues: {
      explosiveSerial: '',
      quantity: 0,
    },
    validationSchema: ExplosivesAndQuantitySchema,
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
            <InputLabel id="explosiveSerial-label">Explosivo</InputLabel>
            <Select
              labelId="explosiveSerial-label"
              label="Explosivo"
              error={!!(errors.explosiveSerial && touched.explosiveSerial)}
              disabled={isSubmitting}
              defaultValue=""
              {...getFieldProps('explosiveSerial')}
              fullWidth
            >
              {explosivesUiStatus === 'loading' && (
                <MenuItem value="">
                  <CircularLoader size={40} message="Cargando municiones" />
                </MenuItem>
              )}
              {explosivesUiStatus === 'apiError' && (
                <MenuItem value="">No hay datos</MenuItem>
              )}
              {explosivesUiStatus === 'loaded' &&
                explosives &&
                explosives.length > 0 &&
                explosives.map(explosive => {
                  const { serial, type, caliber, quantityAvailable } =
                    explosive;
                  return (
                    <MenuItem value={serial} key={serial}>
                      Tipo: {type}, Calibre: {caliber}, Cantidad:{' '}
                      {quantityAvailable}
                    </MenuItem>
                  );
                })}
            </Select>
            <FormHelperText
              error={!!(errors.explosiveSerial && touched.explosiveSerial)}
            >
              {errors.explosiveSerial && touched.explosiveSerial
                ? errors.explosiveSerial
                : 'Seleccione un explosivo'}
            </FormHelperText>
          </FormControl>

          <TextField
            label="Cantidad"
            helperText={
              errors.quantity && touched.quantity
                ? errors.quantity
                : 'Digite la cantidad de explosivos'
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

export default ExplosiveAndQuantityForm;
