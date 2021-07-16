import { ReactElement, useEffect } from 'react';
import { withStyles, WithStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Helmet } from 'react-helmet';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import CircularLoader from '../../components/loading/CircularLoader';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { selectSquads, selectUiStatus } from '../../modules/squads/Slice';
import { getSquads } from '../../modules/squads/Service';
import { displayData } from '../../common/styles';

export type SquadsProps = WithStyles<typeof displayData>;

const Squads = (props: SquadsProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const squads = useAppSelector(selectSquads);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    (async () => {
      await getSquads(dispatch);
    })();
  }, [dispatch]);

  const handleRefresh = async () => {
    await getSquads(dispatch);
  };

  return (
    <>
      <Helmet>
        <title>Armería | Escuadras</title>
      </Helmet>
      <Paper>
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
                  placeholder="Buscar escuadra"
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
        <Paper elevation={0}>
          {uiStatus === 'loading' && (
            <CircularLoader size={150} message="Cargando escuadras..." />
          )}
          {uiStatus === 'loaded' && (
            <TableContainer className={classes.container}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Código</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Escuadrilla</TableCell>
                    <TableCell>Persona a cargo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {squads.map(squad => {
                    return (
                      <TableRow key={squad.code}>
                        <TableCell>{squad.code}</TableCell>
                        <TableCell>{squad.name}</TableCell>
                        <TableCell>{squad.squadronCode}</TableCell>
                        <TableCell>{squad.personId}</TableCell>
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

export default withStyles(displayData)(Squads);
