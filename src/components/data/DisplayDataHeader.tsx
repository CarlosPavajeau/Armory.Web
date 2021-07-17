import { MouseEventHandler, ReactElement, useEffect } from 'react';
import { withStyles, WithStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import { displayData } from '../../common/styles';

export interface DisplayDataHeaderProps extends WithStyles<typeof displayData> {
  handleRefresh: MouseEventHandler<HTMLButtonElement>;
  placeholder: string;
}

const DisplayDataHeader = (props: DisplayDataHeaderProps): ReactElement => {
  const { classes, handleRefresh, placeholder } = props;

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.searchBar}
    >
      <Toolbar>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <SearchIcon color="inherit" className={classes.block} />
          </Grid>
          <Grid item xs>
            <TextField
              placeholder={placeholder}
              InputProps={{
                disableUnderline: true,
                className: classes.searchInput,
              }}
              fullWidth
            />
          </Grid>
          <Grid item>
            <Tooltip title="Refrescar datos">
              <IconButton onClick={handleRefresh}>
                <RefreshIcon color="inherit" className={classes.block} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(displayData)(DisplayDataHeader);
