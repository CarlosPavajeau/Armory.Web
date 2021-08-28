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
import { getDegrees } from '../../modules/degrees/Service';
import {
  loadDegrees,
  loadingDegrees,
  selectDegrees,
  selectError,
  selectUiStatus,
} from '../../modules/degrees/Slice';

export type DegreesProps = WithStyles<typeof displayData>;

const Degrees = (props: DegreesProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const degrees = useAppSelector(selectDegrees);
  const uiStatus = useAppSelector(selectUiStatus);
  const error = useAppSelector(selectError);

  const fetchDegrees = useCallback(async () => {
    dispatch(loadingDegrees());
    const result = await getDegrees();
    dispatch(loadDegrees(result));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await fetchDegrees();
    })();
  }, [fetchDegrees]);

  const handleRefresh = async () => {
    await fetchDegrees();
  };

  return (
    <>
      <Helmet>
        <title>Armería | Grados</title>
      </Helmet>
      <Paper>
        <DisplayDataHeader
          placeholder="Buscar grado"
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
            <CircularLoader size={150} message="Cargando grados..." />
          )}
          {uiStatus === 'loaded' && (
            <TableContainer className={classes.container}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Rango</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {degrees.map(degree => {
                    return (
                      <TableRow key={degree.id}>
                        <TableCell>{degree.id}</TableCell>
                        <TableCell>{degree.name}</TableCell>
                        <TableCell>{degree.rankId}</TableCell>
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

export default withStyles(displayData)(Degrees);
