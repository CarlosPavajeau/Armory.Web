import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import ChangePersonDegreeForm from 'components/dashboard/people/ChangePersonDegreeForm';
import { ReactElement } from 'react';

interface ChangePersonDegreeDialogProps {
  open: boolean;
  personId: string;
  onClose: () => void;
}

const RootContent = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const ChangePersonDegreeDialog = (
  props: ChangePersonDegreeDialogProps,
): ReactElement => {
  const { open, onClose, personId } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle>Actualización de cargo de operaciones y grado</DialogTitle>
      <DialogContent>
        <RootContent>
          <ChangePersonDegreeForm personId={personId} />
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

export default ChangePersonDegreeDialog;
