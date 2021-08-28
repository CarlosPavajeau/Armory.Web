import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ReactElement } from 'react';

export interface CircularLoaderProps {
  size: number;
  message: string;
}

const CircularLoader = (props: CircularLoaderProps): ReactElement => {
  const { size, message } = props;
  return (
    <Grid container spacing={2} alignItems="center" direction="column">
      <Grid item>
        <CircularProgress size={size} />
      </Grid>
      <Grid item>
        <Typography align="center">{message}</Typography>
      </Grid>
    </Grid>
  );
};

export default CircularLoader;
