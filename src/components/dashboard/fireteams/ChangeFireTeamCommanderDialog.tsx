import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import ChangeFireTeamCommanderForm from 'components/dashboard/fireteams/ChangeFireTeamCommanderForm';
import { ReactElement } from 'react';

interface ChangeFireTeamCommanderDialogProps {
  open: boolean;
  fireTeamCode: string;
  onClose: () => void;
}

const RootContent = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const ChangeFireTeamCommanderDialog = (
  props: ChangeFireTeamCommanderDialogProps,
): ReactElement => {
  const { open, fireTeamCode, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle>Cambio de comandante de escuadra</DialogTitle>
      <DialogContent>
        <RootContent>
          <ChangeFireTeamCommanderForm fireTeamCode={fireTeamCode} />

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

export default ChangeFireTeamCommanderDialog;
