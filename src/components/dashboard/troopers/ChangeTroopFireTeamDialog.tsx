import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import ChangeTroopFireTeamForm from 'components/dashboard/troopers/ChangeTroopFireTeamForm';
import { ReactElement } from 'react';

interface ChangeTroopFireTeamDialogProps {
  open: boolean;
  troopId: string;
  onClose: () => void;
}

const RootContent = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const ChangeTroopFireTeamDialog = (
  props: ChangeTroopFireTeamDialogProps,
): ReactElement => {
  const { open, troopId, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle>Cambio de escuadra</DialogTitle>
      <DialogContent>
        <RootContent>
          <ChangeTroopFireTeamForm troopId={troopId} />

          <Button
            color="secondary"
            variant="outlined"
            onClick={handleClose}
            sx={{ mt: 2 }}
            fullWidth
          >
            Cancelar
          </Button>
        </RootContent>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeTroopFireTeamDialog;
