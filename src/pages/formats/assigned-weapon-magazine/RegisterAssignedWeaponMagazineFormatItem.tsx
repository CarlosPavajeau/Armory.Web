import {
  Paper,
  Slide,
  TextField,
  Theme,
  Tooltip,
  useTheme,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { TransitionProps } from '@material-ui/core/transitions';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { WithStyles } from '@material-ui/styles';
import createStyles from '@material-ui/styles/createStyles';
import withStyles from '@material-ui/styles/withStyles';
import { useAppSelector } from 'common/hooks';
import { formStyles } from 'common/styles';
import { useFormik } from 'formik';
import { selectWeapon } from 'modules/armament/weapons/Slice';
import {
  AddAssignedWeaponMagazineFormatItemRequest,
  AssignedWeaponMagazineFormatItem,
} from 'modules/formats/assigned-weapon-magazine/Models';
import { addAssignedWeaponMagazineFormatItem } from 'modules/formats/assigned-weapon-magazine/Service';
import { forwardRef, ReactElement, Ref } from 'react';
import * as Yup from 'yup';

const headerStyles = (theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  });

export interface RegisterAssignedWeaponMagazineFormatItemHeaderProps
  extends WithStyles<typeof headerStyles> {
  onClose: () => void;
}

const RegisterAssignedWeaponMagazineFormatItemHeader = withStyles(headerStyles)(
  (
    props: RegisterAssignedWeaponMagazineFormatItemHeaderProps,
  ): ReactElement => {
    const { classes, onClose } = props;
    return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Tooltip title="Cancelar">
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              size="large"
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" className={classes.title}>
            Registro de item
          </Typography>
        </Toolbar>
      </AppBar>
    );
  },
);

export interface RegisterAssignedWeaponMagazineFormatItemProps
  extends WithStyles<typeof formStyles> {
  open: boolean;
  formatId: string | null;
  onClose: (item: AssignedWeaponMagazineFormatItem | null) => void;
}

const Transition = forwardRef(
  (
    // eslint-disable-next-line react/require-default-props
    props: TransitionProps & { children?: ReactElement },
    ref: Ref<unknown>,
  ) => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Slide direction="up" ref={ref} {...props} />;
  },
);

const RegisterAssignedWeaponMagazineFormatItemSchema = Yup.object().shape({
  cartridgeOfLife: Yup.boolean().required(),
  verifiedInPhysical: Yup.boolean().required(),
  novelty: Yup.boolean().required(),
  ammunitionQuantity: Yup.number()
    .required('Es campo es requerido')
    .min(0, 'Debe ser un valor positivo'),
  ammunitionLot: Yup.string().required('Este campo es requerido'),
  observations: Yup.string(),
});

const RegisterAssignedWeaponMagazineFormatItem = (
  props: RegisterAssignedWeaponMagazineFormatItemProps,
): ReactElement => {
  const { classes, open, onClose, formatId } = props;
  const weapon = useAppSelector(selectWeapon);

  const registerAssignedWeaponMagazineFormatItemForm =
    useFormik<AddAssignedWeaponMagazineFormatItemRequest>({
      initialValues: {
        formatId: formatId != null ? +formatId : 0,
        troopId: weapon != null ? weapon.ownerId : '',
        weaponCode: weapon != null ? weapon.code : '',
        cartridgeOfLife: false,
        verifiedInPhysical: false,
        novelty: false,
        ammunitionQuantity: 0,
        ammunitionLot: '',
        observations: '',
      },
      validationSchema: RegisterAssignedWeaponMagazineFormatItemSchema,
      onSubmit: async (values, actions) => {
        try {
          values.troopId = weapon != null ? weapon.ownerId : '';
          values.weaponCode = weapon != null ? weapon.code : '';
          const result = await addAssignedWeaponMagazineFormatItem(values);
          actions.resetForm();
          onClose({
            ...values,
            id: result,
          });
        } catch (err) {
          // Ignore error
        }
      },
    });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = registerAssignedWeaponMagazineFormatItemForm;

  const theme = useTheme();

  const handleOnClose = () => {
    onClose(null);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleOnClose}
        TransitionComponent={Transition}
        fullScreen
      >
        <RegisterAssignedWeaponMagazineFormatItemHeader
          onClose={handleOnClose}
        />
        <div className={classes.contentWrapper}>
          <Paper
            elevation={2}
            className={classes.paper}
            style={{ padding: theme.spacing(2) }}
          >
            <Typography variant="body2" color="textSecondary" align="center">
              Código de arma: {weapon && weapon.code}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              N° de seríe: {weapon && weapon.series}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              Dueño: {weapon && `${weapon.ownerId} - ${weapon.ownerName}`}
            </Typography>
          </Paper>
          <form onSubmit={handleSubmit} className={classes.form}>
            <FormControl
              component="fieldset"
              className={classes.formField}
              fullWidth
            >
              <FormLabel component="legend">Verificaciones</FormLabel>
              <FormGroup>
                <FormControlLabel
                  label="Novedad"
                  control={
                    <Checkbox
                      id="novelty"
                      name="novelty"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  }
                />
                <FormControlLabel
                  label="Cartucho de la vida"
                  control={
                    <Checkbox
                      id="cartridgeOfLife"
                      name="cartridgeOfLife"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  }
                />
                <FormControlLabel
                  label="Verificado en físico"
                  control={
                    <Checkbox
                      id="verifiedInPhysical"
                      name="verifiedInPhysical"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  }
                />
              </FormGroup>
              <FormHelperText>
                Selecciones las verificaciones que considere necesarias
              </FormHelperText>
            </FormControl>
            <TextField
              id="ammunitionQuantity"
              name="ammunitionQuantity"
              label="Cantidad de munición"
              placeholder="Ejemplo: 22"
              type="number"
              helperText={
                errors.ammunitionQuantity && touched.ammunitionQuantity
                  ? errors.ammunitionQuantity
                  : 'Digite la cantidad de munición'
              }
              error={
                !!(errors.ammunitionQuantity && touched.ammunitionQuantity)
              }
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <TextField
              id="ammunitionLot"
              name="ammunitionLot"
              label="Lote munición"
              helperText={
                errors.ammunitionLot && touched.ammunitionLot
                  ? errors.ammunitionLot
                  : 'Digite el lote de la munición'
              }
              error={!!(errors.ammunitionLot && touched.ammunitionLot)}
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              fullWidth
            />
            <TextField
              id="observations"
              name="observations"
              label="Observaciones"
              helperText={
                errors.observations && touched.observations
                  ? errors.observations
                  : 'Digite las observaciones'
              }
              className={classes.formField}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              rows={3}
              multiline
              fullWidth
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.submitButton}
              disabled={isSubmitting}
              fullWidth
            >
              Añadir registro
            </Button>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default withStyles(formStyles)(RegisterAssignedWeaponMagazineFormatItem);
