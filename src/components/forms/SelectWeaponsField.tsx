import {
  Checkbox,
  FormHelperText,
  ListItemText,
  OutlinedInput,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CircularLoader from 'components/loading/CircularLoader';
import { useField } from 'formik';
import { FieldInputProps } from 'formik/dist/types';
import { useWeapons } from 'modules/armament/weapons/hooks';
import { ReactElement } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface SelectWeaponsFieldProps extends FieldInputProps<any> {
  handleSelect: (event: SelectChangeEvent<string[]>) => void;
  disabled: boolean;
}

const SelectWeaponsField = (props: SelectWeaponsFieldProps): ReactElement => {
  const { handleSelect, disabled, ...others } = props;
  const [weapons, weaponsUiStatus] = useWeapons();
  const [field, meta] = useField(others);

  return (
    <FormControl fullWidth>
      <InputLabel id="weapons-label">Armas</InputLabel>
      <Select
        labelId="weapons-label"
        renderValue={selected => (selected as string[]).join(', ')}
        input={<OutlinedInput label="Armas" />}
        error={!!(meta.error && meta.touched)}
        {...field}
        {...others}
        onChange={handleSelect}
        disabled={disabled}
        multiple
        fullWidth
      >
        {weaponsUiStatus === 'loading' && (
          <MenuItem value="">
            <CircularLoader size={40} message="Cargando armas" />
          </MenuItem>
        )}
        {weaponsUiStatus === 'apiError' && (
          <MenuItem value="">No hay datos</MenuItem>
        )}
        {weaponsUiStatus === 'loaded' &&
          weapons &&
          weapons.length > 0 &&
          weapons.map(weapon => {
            const { serial, type } = weapon;
            return (
              <MenuItem key={serial} value={serial}>
                <Checkbox checked={field.value.indexOf(serial) > -1} />
                <ListItemText primary={`Serial: ${serial}, Tipo: ${type}`} />
              </MenuItem>
            );
          })}
        {weapons && weapons.length === 0 && (
          <MenuItem value="">No hay datos</MenuItem>
        )}
      </Select>
      <FormHelperText error={!!(meta.error && meta.touched)}>
        {meta.error && meta.touched ? meta.error : 'Seleccione una(s) arma'}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectWeaponsField;
