import { FormHelperText } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { formStyles } from 'common/styles';
import CircularLoader from 'components/loading/CircularLoader';
import { useFormik } from 'formik';
import { getAmmunition } from 'modules/armament/ammunition/Service';
import {
  loadAmmunition,
  loadingAmmunition,
  selectAmmunition,
  selectUiStatus as selectAmmunitionUiStatus,
} from 'modules/armament/ammunition/Slice';
import { AmmunitionAndQuantity } from 'modules/formats/war-material-delivery-certificate/Models';
import { ReactElement, useEffect } from 'react';
import * as Yup from 'yup';

export interface AmmunitionAndQuantitySelectionDialogProps
  extends WithStyles<typeof formStyles> {
  open: boolean;
  onClose: (item: AmmunitionAndQuantity | null) => void;
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

  const ammunitionAndQuantityForm = useFormik<AmmunitionAndQuantity>({
    initialValues: {
      ammunitionCode: '',
      quantity: 0,
    },
    validationSchema: AmmunitionAndQuantitySchema,
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
