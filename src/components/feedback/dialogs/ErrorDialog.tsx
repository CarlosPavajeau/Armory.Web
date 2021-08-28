import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { ReactElement } from 'react';

import Alert from '../Alert';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface ErrorDialogProps extends WithStyles<typeof styles> {
  open: boolean;
  errors: string[];
  onClose: () => void;
}

const ErrorDialog = (props: ErrorDialogProps): ReactElement => {
  const { classes, open, errors, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography className={classes.root} variant="h6">
          No se puede completar la acción debido a los siguientes errores:
        </Typography>
        <Tooltip title="Cerrar">
          <IconButton className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </DialogTitle>
      <DialogContent>
        <List>
          {errors.map(error => {
            return (
              <ListItem key={error}>
                <Alert severity="error">
                  <Typography variant="body2">{error}</Typography>
                </Alert>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(ErrorDialog);
