import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import EquipmentAndQuantityForm from 'components/dashboard/formats/EquipmentAndQuantityForm';
import { EquipmentAndQuantity } from 'modules/formats/war-material-delivery-certificate/Models';
import { ReactElement } from 'react';

interface EquipmentAndQuantityDialogProps {
  flightCode: string;
  open: boolean;
  onClose: (item: EquipmentAndQuantity | null) => void;
}

const RootContent = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const EquipmentAndQuantityDialog = (
  props: EquipmentAndQuantityDialogProps,
): ReactElement => {
  const { flightCode, open, onClose } = props;

  const handleClose = () => {
    onClose(null);
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle>Añadir equipo</DialogTitle>
      <DialogContent>
        <RootContent>
          <EquipmentAndQuantityForm
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

export default EquipmentAndQuantityDialog;
