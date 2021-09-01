import { useTheme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/styles';
import { displayData } from 'common/styles';
import { MouseEventHandler, ReactElement } from 'react';

export interface DisplayDataHeaderProps {
  handleRefresh: MouseEventHandler<HTMLButtonElement>;
  placeholder: string;
}

const AppBarStyle = styled(AppBar)({
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
});

const DisplayDataHeader = (props: DisplayDataHeaderProps): ReactElement => {
  const { handleRefresh, placeholder } = props;
  const theme = useTheme();

  return (
    <AppBarStyle position="static" color="default" elevation={0}>
      <Toolbar>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <SearchIcon color="inherit" sx={{ display: 'block' }} />
          </Grid>
          <Grid item xs>
            <TextField
              variant="standard"
              placeholder={placeholder}
              sx={{ fontSize: theme.typography.fontSize }}
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: theme.typography.fontSize },
              }}
              fullWidth
            />
          </Grid>
          <Grid item>
            <Tooltip title="Refrescar datos">
              <IconButton onClick={handleRefresh} size="large">
                <RefreshIcon color="inherit" sx={{ display: 'block' }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBarStyle>
  );
};

export default withStyles(displayData)(DisplayDataHeader);
