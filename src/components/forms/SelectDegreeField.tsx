import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CircularLoader from 'components/loading/CircularLoader';
import { useField } from 'formik';
import { FieldInputProps } from 'formik/dist/types';
import { useDegreesByRank } from 'modules/degrees/hooks';
import React, { ReactElement } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface SelectDegreeFieldProps extends FieldInputProps<any> {
  rankId: number;
  disabled: boolean;
}

const SelectDegreeField = (props: SelectDegreeFieldProps): ReactElement => {
  const { rankId, disabled, ...others } = props;
  const [field, meta] = useField(others);
  const [degrees, degreesUiStatus] = useDegreesByRank(rankId);

  return (
    <FormControl fullWidth>
      <InputLabel id="degree-label">Grado</InputLabel>
      <Select
        labelId="degree-label"
        label="Grado"
        error={!!(meta.error && meta.touched)}
        defaultValue=""
        disabled={disabled}
        {...field}
        {...others}
      >
        {(degreesUiStatus === 'idle' || (!!rankId && rankId === 0)) && (
          <MenuItem value="">Seleccione un cargo de operación primero</MenuItem>
        )}
        {degreesUiStatus === 'loading' && (
          <MenuItem value="">
            <CircularLoader size={40} message="Cargando grados" />
          </MenuItem>
        )}
        {degrees &&
          degrees.map(degree => {
            return (
              <MenuItem value={degree.id} key={degree.id}>
                {degree.name}
              </MenuItem>
            );
          })}
      </Select>
      <FormHelperText error={!!(meta.error && meta.touched)}>
        {meta.touched && meta.error}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectDegreeField;
