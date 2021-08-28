import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { ReactElement } from 'react';

const Alert = (props: AlertProps): ReactElement => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default Alert;
