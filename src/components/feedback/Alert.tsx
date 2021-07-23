import { ReactElement } from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const Alert = (props: AlertProps): ReactElement => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default Alert;
