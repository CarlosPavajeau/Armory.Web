import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import AmmunitionAndQuantityForm from 'components/dashboard/formats/AmmunitionAndQuantityForm';
import { AmmunitionAndQuantity } from 'modules/formats/war-material-delivery-certificate/models';
import { ReactElement } from 'react';

interface AmmunitionAndQuantityDialogProps {
  flightCode: string;
  open: boolean;
  onClose: (item: AmmunitionAndQuantity | null) => void;
}

const RootContent = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const AmmunitionAndQuantityDialog = (
  props: AmmunitionAndQuantityDialogProps,
): ReactElement => {
  const { flightCode, open, onClose } = props;

  const handleClose = () => {
    onClose(null);
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle>Añadir munición</DialogTitle>
      <DialogContent>
        <RootContent>
          <AmmunitionAndQuantityForm
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

export default AmmunitionAndQuantityDialog;
