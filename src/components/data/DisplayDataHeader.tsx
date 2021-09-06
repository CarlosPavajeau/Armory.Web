import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { withStyles } from '@mui/styles';
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
