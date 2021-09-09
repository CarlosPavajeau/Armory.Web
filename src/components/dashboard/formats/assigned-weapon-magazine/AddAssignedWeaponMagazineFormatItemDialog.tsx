import CloseIcon from '@mui/icons-material/Close';
import { Alert, AlertTitle, Dialog, Slide, Tooltip } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';
import AssignedWeaponMagazineFormatItemForm from 'components/dashboard/formats/assigned-weapon-magazine/AssignedWeaponMagazineFormatItemForm';
import AssignedWeaponMagazineFormatWeaponInfo from 'components/dashboard/formats/assigned-weapon-magazine/AssignedWeaponMagazineFormatWeaponInfo';
import { Weapon } from 'modules/armament/weapons/Models';
import { AssignedWeaponMagazineFormatItem } from 'modules/formats/assigned-weapon-magazine/Models';
import { forwardRef, ReactElement, Ref } from 'react';

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

interface AddAssignedWeaponMagazineFormatItemDialogProps {
  open: boolean;
  formatId: number;
  weapon: Weapon | null;
  onClose: (item: AssignedWeaponMagazineFormatItem | null) => void;
}

const AddAssignedWeaponMagazineFormatItemDialog = (
  props: AddAssignedWeaponMagazineFormatItemDialogProps,
): ReactElement => {
  const { open, formatId, weapon, onClose } = props;

  const handleOnClose = () => {
    onClose(null);
  };

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      TransitionComponent={Transition}
      fullScreen
    >
      <AppBar position="relative">
        <Toolbar>
          <Tooltip title="Carcelar">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleOnClose}
              size="large"
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" sx={{ ml: 2, flex: 1 }}>
            Registro de ítem
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ pt: 3, pb: 4 }}>
        {weapon && weapon.ownerId && (
          <>
            <AssignedWeaponMagazineFormatWeaponInfo weapon={weapon} />

            <AssignedWeaponMagazineFormatItemForm
              formatId={formatId}
              weapon={weapon}
              onSuccess={onClose}
            />
          </>
        )}
        {weapon && !weapon.ownerId && (
          <Alert severity="warning" sx={{ marginY: 3 }}>
            <AlertTitle>Arma no asignada</AlertTitle>
            El arma no está asignada ningún oficial, suboficial o soldado.
          </Alert>
        )}
      </Container>
    </Dialog>
  );
};

export default AddAssignedWeaponMagazineFormatItemDialog;
