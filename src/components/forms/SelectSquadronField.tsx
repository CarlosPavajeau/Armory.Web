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
interface SelectSquadronFieldProps extends FieldInputProps<any> {
  disabled: boolean;
}

const SelectSquadronField = (props: SelectSquadronFieldProps): ReactElement => {
  const { disabled, ...others } = props;
  const [squadrons, squadronsUiStatus] = useFlights();
  const [field, meta] = useField(others);

  return (
    <FormControl fullWidth>
      <InputLabel id="squadronCode-label">Unidad</InputLabel>
      <Select
        labelId="squadronCode-label"
        label="Unidad"
        error={!!(meta.error && meta.touched)}
        disabled={disabled}
        defaultValue=""
        {...field}
        {...others}
      >
        {squadronsUiStatus === 'loading' && (
          <MenuItem value="">
            <CircularLoader size={40} message="Cargando escuadrillas" />
          </MenuItem>
        )}
        {squadronsUiStatus === 'apiError' && (
          <MenuItem value="">No hay datos</MenuItem>
        )}
        {squadronsUiStatus === 'loaded' &&
          squadrons &&
          squadrons.length > 0 &&
          squadrons.map(s => {
            return (
              <MenuItem value={s.code} key={s.code}>
                {s.name}
              </MenuItem>
            );
          })}
      </Select>
      <FormHelperText error={!!(meta.error && meta.touched)}>
        {meta.error && meta.touched ? meta.error : 'Seleccione una unidad'}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectSquadronField;
