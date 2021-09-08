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
import { useEquipments } from 'modules/armament/equipments/hooks';
import { EquipmentAndQuantity } from 'modules/formats/war-material-delivery-certificate/Models';
import React, { ReactElement } from 'react';
import * as Yup from 'yup';

interface EquipmentAndQuantityFormProps {
  onSuccess: (item: EquipmentAndQuantity | null) => void;
}

const EquipmentAndQuantityForm = (
  props: EquipmentAndQuantityFormProps,
): ReactElement => {
  const { onSuccess } = props;
  const [equipments, equipmentsUiStatus] = useEquipments();

  const EquipmentAndQuantitySchema = Yup.object().shape({
    equipmentCode: Yup.string().required('Este campo es requerido'),
    quantity: Yup.number()
      .required('Este campo es requerido')
      .min(1, 'Se debe digitar mínimo un equipo'),
  });
  const formik = useFormik<EquipmentAndQuantity>({
    initialValues: {
      equipmentCode: '',
      quantity: 0,
    },
    validationSchema: EquipmentAndQuantitySchema,
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
            <InputLabel id="equipmentCode-label">Equipo</InputLabel>
            <Select
              labelId="equipmentCode-label"
              label="Equipo"
              error={!!(errors.equipmentCode && touched.equipmentCode)}
              disabled={isSubmitting}
              defaultValue=""
              {...getFieldProps('equipmentCode')}
              fullWidth
            >
              {equipmentsUiStatus === 'loading' && (
                <MenuItem value="">
                  <CircularLoader size={40} message="Cargando municiones" />
                </MenuItem>
              )}
              {equipmentsUiStatus === 'apiError' && (
                <MenuItem value="">No hay datos</MenuItem>
              )}
              {equipmentsUiStatus === 'loaded' &&
                equipments &&
                equipments.map(s => {
                  const { code, type, model } = s;
                  return (
                    <MenuItem value={code} key={code}>
                      Código: {code}, Tipo: {type}, Modelo: {model}
                    </MenuItem>
                  );
                })}
            </Select>
            <FormHelperText
              error={!!(errors.equipmentCode && touched.equipmentCode)}
            >
              {errors.equipmentCode && touched.equipmentCode
                ? errors.equipmentCode
                : 'Seleccione un equipo'}
            </FormHelperText>
          </FormControl>

          <TextField
            label="Cantidad"
            helperText={
              errors.quantity && touched.quantity
                ? errors.quantity
                : 'Digite la cantidad de equipos'
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

export default EquipmentAndQuantityForm;
