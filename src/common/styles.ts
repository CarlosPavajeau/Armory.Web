import { Theme } from '@material-ui/core';
import { StyleRules } from '@material-ui/styles';
import createStyles from '@material-ui/styles/createStyles';

const formStyles = (theme: Theme): StyleRules =>
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

const displayData = (theme: Theme): StyleRules =>
  createStyles({
    paper: {
      maxWidth: 936,
      margin: 'auto',
    },
    searchBar: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
      fontSize: theme.typography.fontSize,
    },
    block: {
      display: 'block',
    },
    container: {
      maxHeight: 500,
    },
    withoutData: {
      padding: 30,
    },
  });

export { displayData, formStyles };
