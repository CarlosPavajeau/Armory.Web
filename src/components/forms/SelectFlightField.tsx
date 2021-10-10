import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CircularLoader from 'components/loading/CircularLoader';
import { useField } from 'formik';
import { FieldInputProps } from 'formik/dist/types';
import { useFlights } from 'modules/flights/hooks';
import { ReactElement } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface SelectFlightFieldProps extends FieldInputProps<any> {
  disabled: boolean;
}

const SelectFlightField = (props: SelectFlightFieldProps): ReactElement => {
  const { disabled, ...others } = props;
  const [flights, uiStatus] = useFlights();
  const [field, meta] = useField(others);

  return (
    <FormControl fullWidth>
      <InputLabel id="flightCode-label">Escuadrilla</InputLabel>
      <Select
        labelId="flightCode-label"
        label="Escuadrilla"
        error={!!(meta.error && meta.touched)}
        disabled={disabled}
        defaultValue=""
        {...field}
        {...others}
      >
        {uiStatus === 'loading' && (
          <MenuItem value="">
            <CircularLoader size={40} message="Cargando escuadrillas" />
          </MenuItem>
        )}
        {uiStatus === 'apiError' && <MenuItem value="">No hay datos</MenuItem>}
        {flights &&
          flights.length > 0 &&
          flights.map(flight => {
            const { code, name } = flight;
            return (
              <MenuItem value={code} key={code}>
                {code} - {name}
              </MenuItem>
            );
          })}
      </Select>
      <FormHelperText error={!!(meta.error && meta.touched)}>
        {meta.error && meta.touched ? meta.error : 'Seleccione una escuadrilla'}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectFlightField;
