import { FormHelperText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { WithStyles } from '@material-ui/styles';
import withStyles from '@material-ui/styles/withStyles';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { formStyles } from 'common/styles';
import CircularLoader from 'components/loading/CircularLoader';
import { useFormik } from 'formik';
import { getEquipments } from 'modules/armament/equipments/Service';
import {
  loadEquipments,
  loadingEquipments,
  selectEquipments,
  selectUiStatus as selectEquipmentsUiStatus,
} from 'modules/armament/equipments/Slice';
import { EquipmentAndQuantity } from 'modules/formats/war-material-delivery-certificate/Models';
import { ReactElement, useEffect } from 'react';
import * as Yup from 'yup';

export interface EquipmentsAndQuantitySelectionDialogProps
  extends WithStyles<typeof formStyles> {
  open: boolean;
  onClose: (item: EquipmentAndQuantity | null) => void;
}

const EquipmentAndQuantitySchema = Yup.object().shape({
  equipmentCode: Yup.string().required('Este campo es requerido'),
  quantity: Yup.number()
    .required('Este campo es requerido')
    .min(1, 'Se debe digitar mínimo un equipo'),
});

const EquipmentAndQuantitySelectionDialog = (
  props: EquipmentsAndQuantitySelectionDialogProps,
): ReactElement => {
  const { classes, open, onClose } = props;
  const dispatch = useAppDispatch();
  const equipments = useAppSelector(selectEquipments);
  const equipmentsUiStatus = useAppSelector(selectEquipmentsUiStatus);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingEquipments());
        const result = await getEquipments();
        dispatch(loadEquipments(result));
      } catch (err) {
        // Ignore error
      }
    })();
  }, [dispatch]);

  const equipmentAndQuantityForm = useFormik<EquipmentAndQuantity>({
    initialValues: {
      equipmentCode: '',
      quantity: 0,
    },
    validationSchema: EquipmentAndQuantitySchema,
    onSubmit: (values, actions) => {
      actions.resetForm();
      onClose(values);
    },
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = equipmentAndQuantityForm;

  const handleClose = () => {
    onClose(null);
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle>Añadir equipos</DialogTitle>
      <form onSubmit={handleSubmit} className={classes.form}>
        <DialogContent>
          <div>
            <FormControl className={classes.formField} fullWidth>
              <InputLabel id="select-equipmentCode-label">Equipo</InputLabel>
              <Select
                id="equipmentCode"
                name="equipmentCode"
                labelId="select-equipmentCode-label"
                error={!!(errors.equipmentCode && touched.equipmentCode)}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                defaultValue=""
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
                    return (
                      <MenuItem value={s.code} key={s.code}>
                        {s.code}
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
              id="quantity"
              name="quantity"
              label="Cantidad"
              helperText={
                errors.quantity && touched.quantity
                  ? errors.quantity
                  : 'Digite la cantidad de equipos'
              }
              error={!!(errors.quantity && touched.quantity)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Añadir
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default withStyles(formStyles)(EquipmentAndQuantitySelectionDialog);
