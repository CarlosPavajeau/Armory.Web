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
import { displayData } from '../../common/styles';
import { selectRanks, selectUiStatus } from '../../modules/ranks/Slice';
import { getRanks } from '../../modules/ranks/Service';

export type RanksProps = WithStyles<typeof displayData>;

const Ranks = (props: RanksProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const ranks = useAppSelector(selectRanks);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    (async () => {
      await getRanks(dispatch);
    })();
  }, [dispatch]);

  const handleRefresh = async () => {
    await getRanks(dispatch);
  };

  return (
    <>
      <Helmet>
        <title>Armería | Rangos</title>
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
                  placeholder="Buscar rango"
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
            <CircularLoader size={150} message="Cargando rangos" />
          )}
          {uiStatus === 'loaded' && (
            <TableContainer className={classes.container}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Nombre</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ranks.map(rank => {
                    return (
                      <TableRow key={rank.id}>
                        <TableCell>{rank.id}</TableCell>
                        <TableCell>{rank.name}</TableCell>
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

export default withStyles(displayData)(Ranks);
