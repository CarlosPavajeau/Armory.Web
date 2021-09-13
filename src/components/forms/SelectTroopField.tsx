import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CircularLoader from 'components/loading/CircularLoader';
import { useField } from 'formik';
import { FieldInputProps } from 'formik/dist/types';
import { useTroopersBySquad } from 'modules/troopers/hooks';
import { ReactElement } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface SelectTroopFieldProps extends FieldInputProps<any> {
  squadCode: string;
  disabled: boolean;
}

const SelectTroopField = (props: SelectTroopFieldProps): ReactElement => {
  const { squadCode, disabled, ...others } = props;
  const [field, meta] = useField(others);
  const [troopers, troopersUiStatus] = useTroopersBySquad(squadCode);

  return (
    <FormControl fullWidth>
      <InputLabel id="troopId-label">Solicitante</InputLabel>
      <Select
        labelId="troopId-label"
        label="Solicitante"
        error={!!(meta.error && meta.touched)}
        disabled={disabled}
        defaultValue=""
        {...field}
        {...others}
      >
        {troopersUiStatus === 'loading' && (
          <MenuItem value="">
            <CircularLoader
              size={40}
              message="Cargando oficiales, suboficiales o soldados"
            />
          </MenuItem>
        )}
        {troopersUiStatus === 'apiError' && (
          <MenuItem value="">No hay datos</MenuItem>
        )}
        {troopersUiStatus === 'loaded' &&
          troopers &&
          troopers.map(s => {
            return (
              <MenuItem value={s.id} key={s.id}>
                {s.id} - {s.firstName} {s.secondName} {s.lastName}{' '}
                {s.secondLastName}
              </MenuItem>
            );
          })}
        {troopers && troopers.length === 0 && (
          <MenuItem value="">No hay datos</MenuItem>
        )}
      </Select>
      <FormHelperText error={!!(meta.error && meta.touched)}>
        {meta.error && meta.touched ? meta.error : 'Seleccione un aplicante'}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectTroopField;