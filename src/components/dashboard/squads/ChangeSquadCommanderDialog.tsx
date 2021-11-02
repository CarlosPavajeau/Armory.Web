import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import ChangeSquadCommanderForm from 'components/dashboard/squads/ChangeSquadCommanderForm';
import { ReactElement } from 'react';

interface ChangeSquadCommanderDialogProps {
  open: boolean;
  squadCode: string;
  onClose: () => void;
}

const RootContent = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const ChangeSquadCommanderDialog = (
  props: ChangeSquadCommanderDialogProps,
): ReactElement => {
  const { open, squadCode, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle>Cambio de comandante de escuadrón</DialogTitle>
      <DialogContent>
        <RootContent>
          <ChangeSquadCommanderForm squadCode={squadCode} />

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

export default ChangeSquadCommanderDialog;
