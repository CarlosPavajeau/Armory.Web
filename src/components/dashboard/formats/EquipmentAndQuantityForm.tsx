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
import { useEquipmentsByFlight } from 'modules/armament/equipments/hooks';
import { EquipmentAndQuantity } from 'modules/formats/war-material-delivery-certificate/Models';
import React, { ReactElement } from 'react';
import * as Yup from 'yup';

interface EquipmentAndQuantityFormProps {
  flightCode: string;
  onSuccess: (item: EquipmentAndQuantity | null) => void;
}

const EquipmentAndQuantityForm = (
  props: EquipmentAndQuantityFormProps,
): ReactElement => {
  const { flightCode, onSuccess } = props;
  const [equipments, equipmentsUiStatus] = useEquipmentsByFlight(flightCode);

  const EquipmentAndQuantitySchema = Yup.object().shape({
    equipmentSerial: Yup.string().required('Este campo es requerido'),
    quantity: Yup.number()
      .required('Este campo es requerido')
      .min(1, 'Se debe digitar mínimo un equipo'),
  });
  const formik = useFormik<EquipmentAndQuantity>({
    initialValues: {
      equipmentSerial: '',
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
            <InputLabel id="equipmentSerial-label">Equipo</InputLabel>
            <Select
              labelId="equipmentSerial-label"
              label="Equipo"
              error={!!(errors.equipmentSerial && touched.equipmentSerial)}
              disabled={isSubmitting}
              defaultValue=""
              {...getFieldProps('equipmentSerial')}
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
                equipments.map(equipment => {
                  const { serial, type, quantityAvailable } = equipment;
                  return (
                    <MenuItem value={serial} key={serial}>
                      Tipo: {type}, Serial: {serial}, Cantidad:{' '}
                      {quantityAvailable}
                    </MenuItem>
                  );
                })}
            </Select>
            <FormHelperText
              error={!!(errors.equipmentSerial && touched.equipmentSerial)}
            >
              {errors.equipmentSerial && touched.equipmentSerial
                ? errors.equipmentSerial
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
