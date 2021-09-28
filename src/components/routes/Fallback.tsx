import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ReactElement } from 'react';

const Fallback = (): ReactElement => {
  return (
    <Backdrop
      open
      sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="inherit" size={100} />
    </Backdrop>
  );
};

export default Fallback;
