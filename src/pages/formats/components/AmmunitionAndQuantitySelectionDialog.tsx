import { FormHelperText, WithStyles, withStyles } from '@material-ui/core';
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
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { formStyles } from 'common/styles';
import { useFormik } from 'formik';
import { getAmmunition } from 'modules/armament/ammunition/Service';
import {
  loadAmmunition,
  loadingAmmunition,
  selectAmmunition,
  selectUiStatus as selectAmmunitionUiStatus,
} from 'modules/armament/ammunition/Slice';
import { ItemAndQuantity } from 'modules/formats/war-material-delivery-certificate/Models';
import { ReactElement, useEffect } from 'react';
import * as Yup from 'yup';

import CircularLoader from '../../../components/loading/CircularLoader';

export interface AmmunitionAndQuantitySelectionDialogProps
  extends WithStyles<typeof formStyles> {
  open: boolean;
  onClose: (item: ItemAndQuantity | null) => void;
}

const AmmunitionAndQuantitySchema = Yup.object().shape({
  ammunitionCode: Yup.string().required('Este campo es requerido'),
  quantity: Yup.number()
    .required('Este campo es requerido')
    .min(1, 'Se debe digitar mínimo una munición'),
});

const AmmunitionAndQuantitySelectionDialog = (
  props: AmmunitionAndQuantitySelectionDialogProps,
): ReactElement => {
  const { classes, open, onClose } = props;
  const dispatch = useAppDispatch();
  const ammunition = useAppSelector(selectAmmunition);
  const ammunitionUiStatus = useAppSelector(selectAmmunitionUiStatus);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingAmmunition());
        const result = await getAmmunition();
        dispatch(loadAmmunition(result));
      } catch (err) {
        // Ignore error
      }
    })();
  }, [dispatch]);

  const ammunitionAndQuantityForm = useFormik({
    initialValues: {
      ammunitionCode: '',
      quantity: 0,
    },
    validationSchema: AmmunitionAndQuantitySchema,
    onSubmit: (values, actions) => {
      const item: ItemAndQuantity = {
        [values.ammunitionCode]: +values.quantity,
      };

      actions.resetForm();
      onClose(item);
    },
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = ammunitionAndQuantityForm;

  const handleClose = () => {
    onClose(null);
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle>Añadir municiones</DialogTitle>
      <form onSubmit={handleSubmit} className={classes.form}>
        <DialogContent>
          <div>
            <FormControl className={classes.formField} fullWidth>
              <InputLabel id="select-ammunitionCode-label">Munición</InputLabel>
              <Select
                id="ammunitionCode"
                name="ammunitionCode"
                labelId="select-ammunitionCode-label"
                error={!!(errors.ammunitionCode && touched.ammunitionCode)}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                defaultValue=""
                fullWidth
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
              id="quantity"
              name="quantity"
              label="Cantidad"
              helperText={
                errors.quantity && touched.quantity
                  ? errors.quantity
                  : 'Digite la cantidad de munición'
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

export default withStyles(formStyles)(AmmunitionAndQuantitySelectionDialog);
