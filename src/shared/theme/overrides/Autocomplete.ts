import { Theme } from '@material-ui/core';

export default function Autocomplete(theme: Theme): unknown {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.z20,
        },
      },
    },
  };
}
