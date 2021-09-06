import { Theme } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import { ReactElement } from 'react';

const fallBackStyles = (theme: Theme) =>
  createStyles({
    backdrop: {
      color: '#fff',
      zIndex: theme.zIndex.drawer + 1,
      backdropFilter: 'blur(7px)',
    },
  });

export type FallbackProps = WithStyles<typeof fallBackStyles>;

const Fallback = (props: FallbackProps): ReactElement => {
  const { classes } = props;

  return (
    <Backdrop open className={classes.backdrop}>
      <CircularProgress color="inherit" size={100} />
    </Backdrop>
  );
};

export default withStyles(fallBackStyles)(Fallback);
