import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import UpdateRankForm from 'components/dashboard/ranks/UpdateRankForm';
import { ReactElement } from 'react';

interface UpdateRankDialogProps {
  open: boolean;
  rankId: number;
  onClose: () => void;
}

const RootContent = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const UpdateRankDialog = (props: UpdateRankDialogProps): ReactElement => {
  const { open, rankId, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Actializar cargo de operación</DialogTitle>
      <DialogContent>
        <RootContent>
          <UpdateRankForm rankId={rankId} />

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

export default UpdateRankDialog;
