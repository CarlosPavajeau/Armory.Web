import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CircularLoader from 'components/loading/CircularLoader';
import { useField } from 'formik';
import { FieldInputProps } from 'formik/dist/types';
import { useFireTeamsByFlight } from 'modules/fireteams/hooks';
import { ReactElement } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface SelectFireteamFieldProps extends FieldInputProps<any> {
  flightCode: string;
  disabled: boolean;
}

const SelectFireteamField = (props: SelectFireteamFieldProps): ReactElement => {
  const { flightCode, disabled, ...others } = props;
  const [field, meta] = useField(others);
  const [fireteams, uiStatus] = useFireTeamsByFlight(flightCode);

  return (
    <FormControl fullWidth>
      <InputLabel id="fireteamCode-label">Escuadra</InputLabel>
      <Select
        labelId="fireteamCode-label"
        label="Escuadra"
        error={!!(meta.error && meta.touched)}
        disabled={disabled}
        defaultValue=""
        {...field}
        {...others}
      >
        {uiStatus === 'loading' && (
          <MenuItem value="">
            <CircularLoader size={40} message="Cargando escuadras" />
          </MenuItem>
        )}
        {uiStatus === 'apiError' && <MenuItem value="">No hay datos</MenuItem>}
        {uiStatus === 'loaded' &&
          fireteams &&
          fireteams.map(fireteam => {
            const { code, name } = fireteam;
            return (
              <MenuItem value={code} key={code}>
                {code} - {name}
              </MenuItem>
            );
          })}
        {fireteams && fireteams.length === 0 && (
          <MenuItem value="">No hay datos</MenuItem>
        )}
      </Select>
      <FormHelperText error={!!(meta.error && meta.touched)}>
        {meta.error && meta.touched ? meta.error : 'Seleccione una escuadra'}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectFireteamField;
