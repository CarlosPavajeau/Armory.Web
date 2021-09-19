import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CircularLoader from 'components/loading/CircularLoader';
import { useField } from 'formik';
import { FieldInputProps } from 'formik/dist/types';
import { useRanks } from 'modules/ranks/hooks';
import React, { ReactElement } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface SelectRankFieldProps extends FieldInputProps<any> {
  disabled: boolean;
}

const SelectRankField = (props: SelectRankFieldProps): ReactElement => {
  const { disabled, ...others } = props;
  const [field, meta] = useField(others);
  const [ranks, ranksUiStatus] = useRanks();

  return (
    <FormControl fullWidth>
      <InputLabel id="rank-label">Cargo de operación</InputLabel>
      <Select
        labelId="rank-label"
        label="Cargo de operación"
        defaultValue=""
        error={!!(meta.error && meta.touched)}
        disabled={disabled}
        {...field}
        {...others}
      >
        {ranksUiStatus === 'loading' && (
          <MenuItem value="">
            <CircularLoader size={40} message="Cargando cargos de operación" />
          </MenuItem>
        )}
        {ranksUiStatus === 'loaded' &&
          ranks &&
          ranks.map(rank => {
            return (
              <MenuItem value={rank.id} key={rank.id}>
                {rank.name}
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

export default SelectRankField;
