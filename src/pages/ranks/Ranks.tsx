import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { WithStyles } from '@material-ui/styles';
import withStyles from '@material-ui/styles/withStyles';
import clsx from 'clsx';
import { ReactElement, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { displayData } from '../../common/styles';
import DisplayDataHeader from '../../components/data/DisplayDataHeader';
import Alert from '../../components/feedback/Alert';
import CircularLoader from '../../components/loading/CircularLoader';
import { getRanks } from '../../modules/ranks/Service';
import {
  apiError,
  loadingRanks,
  loadRanks,
  selectError,
  selectRanks,
  selectUiStatus,
} from '../../modules/ranks/Slice';

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
    } catch (err: unknown) {
      dispatch(apiError((err as Error).message));
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
