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
import { getSquadrons } from '../../modules/squadrons/Service';
import {
  apiError,
  loadingSquadrons,
  loadSquadrons,
  selectError,
  selectSquadrons,
  selectUiStatus,
} from '../../modules/squadrons/Slice';

export type SquadronsProps = WithStyles<typeof displayData>;

const Squadrons = (props: SquadronsProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const squadrons = useAppSelector(selectSquadrons);
  const uiStatus = useAppSelector(selectUiStatus);
  const error = useAppSelector(selectError);

  const fetchSquadrons = useCallback(async () => {
    try {
      dispatch(loadingSquadrons());
      const result = await getSquadrons();
      dispatch(loadSquadrons(result));
    } catch (err: unknown) {
      dispatch(apiError((err as Error).message));
    }
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await fetchSquadrons();
    })();
  }, [fetchSquadrons]);

  const handleRefresh = async () => {
    await fetchSquadrons();
  };

  return (
    <>
      <Helmet>
        <title>Armería | Escuadrillas</title>
      </Helmet>
      <Paper>
        <DisplayDataHeader
          placeholder="Buscar escudrilla"
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
            <CircularLoader size={150} message="Cargando escuadrillas..." />
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
                        <TableCell>{squadron.personId}</TableCell>
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

export default withStyles(displayData)(Squadrons);
