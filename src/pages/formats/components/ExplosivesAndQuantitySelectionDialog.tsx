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
import { getExplosives } from 'modules/armament/explosives/Service';
import {
  loadExplosives,
  loadingExplosives,
  selectExplosives,
  selectUiStatus as selectExplosivesUiStatus,
} from 'modules/armament/explosives/Slice';
import { ExplosiveAndQuantity } from 'modules/formats/war-material-delivery-certificate/Models';
import { ReactElement, useEffect } from 'react';
import * as Yup from 'yup';

export interface ExplosivesAndQuantitySelectionDialogProps
  extends WithStyles<typeof formStyles> {
  open: boolean;
  onClose: (item: ExplosiveAndQuantity | null) => void;
}

const ExplosivesAndQuantitySchema = Yup.object().shape({
  explosiveCode: Yup.string().required('Este campo es requerido'),
  quantity: Yup.number()
    .required('Este campo es requerido')
    .min(1, 'Se debe digitar mínimo un explosivo'),
});

const ExplosivesAndQuantitySelectionDialog = (
  props: ExplosivesAndQuantitySelectionDialogProps,
): ReactElement => {
  const { classes, open, onClose } = props;
  const dispatch = useAppDispatch();
  const explosives = useAppSelector(selectExplosives);
  const explosivesUiStatus = useAppSelector(selectExplosivesUiStatus);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingExplosives());
        const result = await getExplosives();
        dispatch(loadExplosives(result));
      } catch (err) {
        // Ignore error
      }
    })();
  }, [dispatch]);

  const explosiveAndQuantityForm = useFormik({
    initialValues: {
      explosiveCode: '',
      quantity: 0,
    },
    validationSchema: ExplosivesAndQuantitySchema,
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
  } = explosiveAndQuantityForm;

  const handleClose = () => {
    onClose(null);
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle>Añadir explosivos</DialogTitle>
      <form onSubmit={handleSubmit} className={classes.form}>
        <DialogContent>
          <div>
            <FormControl className={classes.formField} fullWidth>
              <InputLabel id="select-explosiveCode-label">Explosivo</InputLabel>
              <Select
                id="explosiveCode"
                name="explosiveCode"
                labelId="select-explosiveCode-label"
                error={!!(errors.explosiveCode && touched.explosiveCode)}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                defaultValue=""
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
                  explosives.map(s => {
                    return (
                      <MenuItem value={s.code} key={s.code}>
                        {s.code}
                      </MenuItem>
                    );
                  })}
              </Select>
              <FormHelperText
                error={!!(errors.explosiveCode && touched.explosiveCode)}
              >
                {errors.explosiveCode && touched.explosiveCode
                  ? errors.explosiveCode
                  : 'Seleccione un explosivo'}
              </FormHelperText>
            </FormControl>
            <TextField
              id="quantity"
              name="quantity"
              label="Cantidad"
              helperText={
                errors.quantity && touched.quantity
                  ? errors.quantity
                  : 'Digite la cantidad de explosivos'
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

export default withStyles(formStyles)(ExplosivesAndQuantitySelectionDialog);
