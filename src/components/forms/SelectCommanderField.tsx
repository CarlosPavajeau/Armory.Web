import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CircularLoader from 'components/loading/CircularLoader';
import { useField } from 'formik';
import { FieldInputProps } from 'formik/dist/types';
import { usePeopleByRank } from 'modules/people/hooks';
import React, { ReactElement } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface SelectCommanderProps extends FieldInputProps<any> {
  rankName: string;
  disabled: boolean;
}

const SelectCommanderField = (props: SelectCommanderProps): ReactElement => {
  const { rankName, disabled, ...others } = props;
  const [field, meta] = useField(others);
  const [people, peopleUiState] = usePeopleByRank(rankName);

  return (
    <FormControl fullWidth>
      <InputLabel id="person-label">Comandante</InputLabel>
      <Select
        labelId="person-label"
        label="Comandante"
        error={!!(meta.error && meta.touched)}
        disabled={disabled}
        defaultValue=""
        {...field}
        {...others}
      >
        {peopleUiState === 'loading' && (
          <MenuItem value="">
            <CircularLoader size={40} message="Cargando comandantes" />
          </MenuItem>
        )}
        {people &&
          people.length > 0 &&
          people.map(p => {
            const { id, firstName, secondName, lastName, secondLastName } = p;
            return (
              <MenuItem value={id} key={id}>
                {firstName} {secondName} {lastName} {secondLastName}
              </MenuItem>
            );
          })}
      </Select>
      <FormHelperText error={!!(meta.error && meta.touched)}>
        {meta.touched && meta.error ? meta.error : 'Seleccione un comandante'}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectCommanderField;
