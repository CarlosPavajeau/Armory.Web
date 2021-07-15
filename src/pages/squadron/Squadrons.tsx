import React, { useEffect } from 'react';
import {
  AppBar,
  CircularProgress,
  createStyles,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Helmet } from 'react-helmet';
import CircularLoader from '../../components/loading/CircularLoader';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { getSquadrons } from '../../modules/squadrons/Service';
import { selectSquadrons, selectUiStatus } from '../../modules/squadrons/Slice';

const styles = (theme: Theme) =>
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
  });

export type SquadronsProps = WithStyles<typeof styles>;

const Squadrons = (props: SquadronsProps) => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const squadrons = useAppSelector(selectSquadrons);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    (async () => {
      await getSquadrons(dispatch);
    })();
  }, [dispatch]);

  const handleRefresh = async () => {
    await getSquadrons(dispatch);
  };

  return (
    <>
      <Helmet>
        <title>Armería | Escuadrillas</title>
      </Helmet>
      <Paper>
        <AppBar
          className={classes.searchBar}
          position="static"
          color="default"
          elevation={0}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon className={classes.block} color="inherit" />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Buscar escuadrilla"
                  InputProps={{
                    disableUnderline: true,
                    className: classes.searchInput,
                  }}
                />
              </Grid>
              <Grid item>
                <Tooltip title="Refrescar datos">
                  <IconButton onClick={handleRefresh}>
                    <RefreshIcon className={classes.block} color="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Paper elevation={0}>
          {uiStatus === 'loading' && (
            <CircularLoader size={150} message="Cargnado escuadrillas..." />
          )}
          {uiStatus === 'loaded' && (
            <TableContainer className={classes.container}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Código</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Persona a cargo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {squadrons.map(squadron => {
                    return (
                      <TableRow key={squadron.code}>
                        <TableCell>{squadron.code}</TableCell>
                        <TableCell>{squadron.name}</TableCell>
                        <TableCell>Manolo</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Paper>
    </>
  );
};

export default withStyles(styles)(Squadrons);
