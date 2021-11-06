import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import UpdateDegreeForm from 'components/dashboard/degrees/UpdateDegreeForm';
import { ReactElement } from 'react';

interface UpdateDegreeDialogProps {
  open: boolean;
  degreeId: number;
  onClose: () => void;
}

const RootContent = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const UpdateDegreeDialog = (props: UpdateDegreeDialogProps): ReactElement => {
  const { open, degreeId, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Actualizar grado</DialogTitle>
      <DialogContent>
        <RootContent>
          <UpdateDegreeForm degreeId={degreeId} />

          <Button
            color="secondary"
            variant="outlined"
            onClick={onClose}
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

export default UpdateDegreeDialog;
