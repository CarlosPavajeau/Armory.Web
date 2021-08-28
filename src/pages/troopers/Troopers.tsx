import { WithStyles, withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import { ReactElement, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { displayData } from '../../common/styles';
import DisplayDataHeader from '../../components/data/DisplayDataHeader';
import Alert from '../../components/feedback/Alert';
import CircularLoader from '../../components/loading/CircularLoader';
import { getTroopers } from '../../modules/troopers/Service';
import {
  apiError,
  loadingTroopers,
  loadTroopers,
  selectError,
  selectTroopers,
  selectUiStatus,
} from '../../modules/troopers/Slice';

export type TroopersProps = WithStyles<typeof displayData>;

const Troopers = (props: TroopersProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const troopers = useAppSelector(selectTroopers);
  const uiStatus = useAppSelector(selectUiStatus);
  const error = useAppSelector(selectError);

  const fetchTroopers = useCallback(async () => {
    try {
      dispatch(loadingTroopers());
      const result = await getTroopers();
      dispatch(loadTroopers(result));
    } catch (err) {
      dispatch(apiError(err.message));
    }
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await fetchTroopers();
    })();
  }, [fetchTroopers]);

  const handleRefresh = async () => {
    await fetchTroopers();
  };

  return (
    <>
      <Helmet>
        <title>Armería | Tropas</title>
      </Helmet>
      <Paper>
        <DisplayDataHeader
          placeholder="Buscar tropa"
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
            <CircularLoader size={150} message="Cargando tropas..." />
          )}
          {uiStatus === 'loaded' && (
            <TableContainer className={classes.container}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Identificación</TableCell>
                    <TableCell>Nombre completo</TableCell>
                    <TableCell>Escuadrón</TableCell>
                    <TableCell>Grado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {troopers.map(troop => {
                    return (
                      <TableRow key={troop.id}>
                        <TableCell>{troop.id}</TableCell>
                        <TableCell>
                          {troop.firstName} {troop.secondName} {troop.lastName}{' '}
                          {troop.secondLastName}
                        </TableCell>
                        <TableCell>{troop.squadCode}</TableCell>
                        <TableCell>{troop.degreeId}</TableCell>
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

export default withStyles(displayData)(Troopers);
