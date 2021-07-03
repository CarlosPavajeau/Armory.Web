import { createStyles, Theme } from '@material-ui/core';

const formStyles = (theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: 936,
      margin: 'auto',
      overflow: 'hidden',
    },
    contentWrapper: {
      margin: '40px 16px',
    },
    form: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    formField: {
      marginBottom: theme.spacing(2),
    },
    registerError: {
      marginTop: theme.spacing(2),
    },
    submitButton: {
      marginTop: 24,
    },
  });

export { formStyles };
