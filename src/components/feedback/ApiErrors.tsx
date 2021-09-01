import Alert from '@material-ui/core/Alert';
import { useAppSelector } from 'common/hooks';
import { selectApiErrors } from 'modules/application/Slice';
import { ReactElement } from 'react';

const ApiErrors = (): ReactElement => {
  const apiErrors = useAppSelector(selectApiErrors);

  return (
    <>
      {apiErrors &&
        apiErrors.length > 0 &&
        apiErrors.map(error => {
          return (
            <Alert severity="error" sx={{ marginY: 3 }}>
              {error}
            </Alert>
          );
        })}
    </>
  );
};

export default ApiErrors;
