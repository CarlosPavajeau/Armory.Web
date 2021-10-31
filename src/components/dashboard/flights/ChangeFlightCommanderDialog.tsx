import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import ChangeFlightCommanderForm from 'components/dashboard/flights/ChangeFlightCommanderForm';
import { ReactElement } from 'react';

interface ChangeFlightCommanderDialogProps {
  open: boolean;
  flightCode: string;
  onClose: () => void;
}

const RootContent = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const ChangeFlightCommanderDialog = (
  props: ChangeFlightCommanderDialogProps,
): ReactElement => {
  const { open, flightCode, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle>Cambio de comandante de escuadrilla</DialogTitle>
      <DialogContent>
        <RootContent>
          <ChangeFlightCommanderForm flightCode={flightCode} />
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

export default ChangeFlightCommanderDialog;
