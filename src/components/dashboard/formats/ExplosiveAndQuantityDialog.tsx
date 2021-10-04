import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import ExplosiveAndQuantityForm from 'components/dashboard/formats/ExplosiveAndQuantityForm';
import { ExplosiveAndQuantity } from 'modules/formats/war-material-delivery-certificate/models';
import { ReactElement } from 'react';

interface ExplosiveAndQuantityDialogProps {
  flightCode: string;
  open: boolean;
  onClose: (item: ExplosiveAndQuantity | null) => void;
}

const RootContent = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const ExplosiveAndQuantityDialog = (
  props: ExplosiveAndQuantityDialogProps,
): ReactElement => {
  const { flightCode, open, onClose } = props;

  const handleClose = () => {
    onClose(null);
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle>Añadir explosivo</DialogTitle>
      <DialogContent>
        <RootContent>
          <ExplosiveAndQuantityForm
            flightCode={flightCode}
            onSuccess={onClose}
          />
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

export default ExplosiveAndQuantityDialog;
