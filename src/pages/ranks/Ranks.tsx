import { ReactElement, useCallback, useEffect } from 'react';
import { withStyles, WithStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Helmet } from 'react-helmet';
import clsx from 'clsx';
import CircularLoader from '../../components/loading/CircularLoader';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { displayData } from '../../common/styles';
import {
  selectRanks,
  selectUiStatus,
  selectError,
  loadingRanks,
  loadRanks,
  apiError,
} from '../../modules/ranks/Slice';
import { getRanks } from '../../modules/ranks/Service';
import DisplayDataHeader from '../../components/data/DisplayDataHeader';
import Alert from '../../components/feedback/Alert';

export type RanksProps = WithStyles<typeof displayData>;

const Ranks = (props: RanksProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const ranks = useAppSelector(selectRanks);
  const uiStatus = useAppSelector(selectUiStatus);
  const error = useAppSelector(selectError);

  const fetchRanks = useCallback(async () => {
    try {
      dispatch(loadingRanks());
      const result = await getRanks();
      dispatch(loadRanks(result));
    } catch (err) {
      dispatch(apiError(err.message));
    }
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await fetchRanks();
    })();
  }, [fetchRanks]);

  const handleRefresh = async () => {
    await fetchRanks();
  };

  return (
    <>
      <Helmet>
        <title>Armería | Rangos</title>
      </Helmet>
      <Paper>
        <DisplayDataHeader
          placeholder="Buscar rango"
          handleRefresh={handleRefresh}
        />
        <Paper
          elevation={0}
          className={clsx(
            (uiStatus === 'loading' || uiStatus === 'apiError') &&
              classes.withoutData,
          )}
        >
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
          {uiStatus === 'apiError' && <Alert severity="error">{error}</Alert>}
        </Paper>
      </Paper>
    </>
  );
};

export default withStyles(displayData)(Ranks);
