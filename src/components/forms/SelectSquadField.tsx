import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CircularLoader from 'components/loading/CircularLoader';
import { useField } from 'formik';
import { FieldInputProps } from 'formik/dist/types';
import { useSquads } from 'modules/squads/hooks';
import { ReactElement } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface SelectSquadFieldProps extends FieldInputProps<any> {
  disabled: boolean;
}

const SelectSquadField = (props: SelectSquadFieldProps): ReactElement => {
  const { disabled, ...others } = props;
  const [squads, uiStatus] = useSquads();
  const [field, meta] = useField(others);

  return (
    <FormControl fullWidth>
      <InputLabel id="squadCode-label">Escuadrón</InputLabel>
      <Select
        labelId="squadCode-label"
        label="Escuadrón"
        error={!!(meta.error && meta.touched)}
        disabled={disabled}
        defaultValue=""
        {...field}
        {...others}
      >
        {uiStatus === 'loading' && (
          <MenuItem value="">
            <CircularLoader size={40} message="Cargando escuadrones" />
          </MenuItem>
        )}
        {uiStatus === 'apiError' && <MenuItem value="">No hay datos</MenuItem>}
        {squads &&
          squads.length > 0 &&
          squads.map(squad => {
            const { code, name } = squad;
            return (
              <MenuItem value={code} key={code}>
                {code} - {name}
              </MenuItem>
            );
          })}
      </Select>
      <FormHelperText error={!!(meta.error && meta.touched)}>
        {meta.error && meta.touched ? meta.error : 'Seleccione una escuadrón'}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectSquadField;
