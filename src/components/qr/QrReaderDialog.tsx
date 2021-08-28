import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { ReactElement, useState } from 'react';

import Alert from '../feedback/Alert';
import QrReader from './QrReader';

export interface QrReaderDialogProps {
  open: boolean;
  onClose: (value: string | null) => void;
}

const QrReaderDialog = (props: QrReaderDialogProps): ReactElement => {
  const { open, onClose } = props;
  const [hasError, setHasError] = useState(false);

  const handleClose = () => {
    setHasError(false);
    onClose(null);
  };

  const handleScan = (value: string | null) => {
    if (value != null) {
      setHasError(false);
      onClose(value);
    }
  };

  const handleError = (err: any) => {
    setHasError(true);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Escanear QR</DialogTitle>
      <DialogContent>
        <Grid container alignItems="center">
          <Grid item xs>
            <QrReader handleScan={handleScan} handleError={handleError} />
          </Grid>
        </Grid>
        {hasError && <Alert severity="error">No se pudo leer la imagen.</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QrReaderDialog;
