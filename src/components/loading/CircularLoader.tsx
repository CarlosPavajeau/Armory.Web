import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
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
