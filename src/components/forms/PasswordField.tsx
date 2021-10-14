import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { InputAdornment, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useField } from 'formik';
import { FieldInputProps } from 'formik/dist/types';
import { ReactElement, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface PasswordFieldProps extends FieldInputProps<any> {
  label: string;
  helperText: string;
  disabled: boolean;
}

const PasswordField = (props: PasswordFieldProps): ReactElement => {
  const { label, disabled, helperText, ...others } = props;
  const [field, meta] = useField(others);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(show => !show);
  };

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      label={label}
      helperText={(meta.touched && meta.error) || helperText}
      error={Boolean(meta.touched && meta.error)}
      disabled={disabled}
      {...field}
      {...others}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleShowPassword} edge="end" size="large">
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
    />
  );
};

export default PasswordField;
