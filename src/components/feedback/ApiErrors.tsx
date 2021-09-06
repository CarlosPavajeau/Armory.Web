import { Collapse } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useAppSelector } from 'common/hooks';
import { selectApiErrors } from 'modules/application/Slice';
import { ReactElement } from 'react';

const ApiErrors = (): ReactElement => {
  const apiErrors = useAppSelector(selectApiErrors);

  return (
    <Collapse in={apiErrors && apiErrors.length > 0}>
      {apiErrors.map(error => {
        return (
          <Alert severity="error" sx={{ marginY: 3 }}>
            {error}
          </Alert>
        );
      })}
    </Collapse>
  );
};

export default ApiErrors;
