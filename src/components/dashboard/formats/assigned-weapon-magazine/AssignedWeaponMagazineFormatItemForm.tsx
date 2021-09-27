import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import ApiErrors from 'components/feedback/ApiErrors';
import Consola from 'consola';
import { Form, FormikProvider, useFormik } from 'formik';
import { Weapon } from 'modules/armament/weapons/Models';
import {
  AddAssignedWeaponMagazineFormatItemRequest,
  AssignedWeaponMagazineFormatItem,
} from 'modules/formats/assigned-weapon-magazine/Models';
import { addAssignedWeaponMagazineFormatItem } from 'modules/formats/assigned-weapon-magazine/Service';
import React, { ReactElement } from 'react';
import * as Yup from 'yup';

interface AssignedWeaponMagazineFormatItemFormProps {
  formatId: number;
  weapon: Weapon | null;
  onSuccess: (item: AssignedWeaponMagazineFormatItem) => void;
}

const AssignedWeaponMagazineFormatItemForm = (
  props: AssignedWeaponMagazineFormatItemFormProps,
): ReactElement => {
  const { formatId, weapon, onSuccess } = props;

  const RegisterAssignedWeaponMagazineFormatItemSchema = Yup.object().shape({
    safetyCartridge: Yup.boolean().required(),
    verifiedInPhysical: Yup.boolean().required(),
    novelty: Yup.boolean().required(),
    ammunitionQuantity: Yup.number()
      .required('Es campo es requerido')
      .min(0, 'Debe ser un valor positivo'),
    ammunitionLot: Yup.string().required('Este campo es requerido'),
    observations: Yup.string(),
  });

  const formik = useFormik<AddAssignedWeaponMagazineFormatItemRequest>({
    initialValues: {
      formatId,
      troopId: weapon?.ownerId || '',
      weaponSeries: weapon?.series || '',
      safetyCartridge: false,
      verifiedInPhysical: false,
      novelty: false,
      ammunitionQuantity: 0,
      ammunitionLot: '',
      observations: '',
    },
    validationSchema: RegisterAssignedWeaponMagazineFormatItemSchema,
    onSubmit: async values => {
      try {
        values.troopId = weapon != null ? weapon.ownerId : '';
        values.weaponSeries = weapon != null ? weapon.series : '';
        const result = await addAssignedWeaponMagazineFormatItem(values);
        onSuccess(result);
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
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Verificaciones</FormLabel>
              <FormGroup>
                <FormControlLabel
                  label="Novedad"
                  control={<Checkbox {...getFieldProps('novelty')} />}
                />
                <FormControlLabel
                  label="Cartucho de seguridad"
                  control={<Checkbox {...getFieldProps('safetyCartridge')} />}
                />
                <FormControlLabel
                  label="Verificado en físico"
                  control={
                    <Checkbox {...getFieldProps('verifiedInPhysical')} />
                  }
                />
              </FormGroup>
              <FormHelperText>
                Selecciones las verificaciones que considere necesarias
              </FormHelperText>
            </FormControl>
          </Stack>

          <TextField
            label="Cantidad de munición"
            placeholder="Ejemplo: 22"
            type="number"
            helperText={
              errors.ammunitionQuantity && touched.ammunitionQuantity
                ? errors.ammunitionQuantity
                : 'Digite la cantidad de munición'
            }
            error={!!(errors.ammunitionQuantity && touched.ammunitionQuantity)}
            disabled={isSubmitting}
            {...getFieldProps('ammunitionQuantity')}
            fullWidth
          />
          <TextField
            label="Lote munición"
            helperText={
              errors.ammunitionLot && touched.ammunitionLot
                ? errors.ammunitionLot
                : 'Digite el lote de la munición'
            }
            error={!!(errors.ammunitionLot && touched.ammunitionLot)}
            disabled={isSubmitting}
            {...getFieldProps('ammunitionLot')}
            fullWidth
          />
          <TextField
            label="Observaciones"
            helperText={
              errors.observations && touched.observations
                ? errors.observations
                : 'Digite las observaciones'
            }
            disabled={isSubmitting}
            rows={3}
            {...getFieldProps('observations')}
            multiline
            fullWidth
          />

          <ApiErrors />

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Agregar ítem
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default AssignedWeaponMagazineFormatItemForm;
