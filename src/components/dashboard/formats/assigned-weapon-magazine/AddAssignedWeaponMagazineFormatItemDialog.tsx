import { Dialog, Slide, Tooltip } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { TransitionProps } from '@material-ui/core/transitions';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import AssignedWeaponMagazineFormatItemForm from 'components/dashboard/formats/assigned-weapon-magazine/AssignedWeaponMagazineFormatItemForm';
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

      <Container sx={{ pt: 7 }}>
        <AssignedWeaponMagazineFormatItemForm
          formatId={formatId}
          weapon={weapon}
          onSuccess={onClose}
        />
      </Container>
    </Dialog>
  );
};

export default AddAssignedWeaponMagazineFormatItemDialog;
