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
import { getSquads } from '../../modules/squads/Service';
import {
  apiError,
  loadingSquads,
  loadSquads,
  selectError,
  selectSquads,
  selectUiStatus
} from '../../modules/squads/Slice';

export type SquadsProps = WithStyles<typeof displayData>;

const Squads = (props: SquadsProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const squads = useAppSelector(selectSquads);
  const uiStatus = useAppSelector(selectUiStatus);
  const error = useAppSelector(selectError);

  const fetchSquads = useCallback(async () => {
    try {
      dispatch(loadingSquads());
      const result = await getSquads();
      dispatch(loadSquads(result));
    } catch (err) {
      dispatch(apiError(err.message));
    }
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await fetchSquads();
    })();
  }, [fetchSquads]);

  const handleRefresh = async () => {
    await fetchSquads();
  };

  return (
    <>
      <Helmet>
        <title>Armería | Escuadras</title>
      </Helmet>
      <Paper>
        <DisplayDataHeader
          placeholder="Buscar escuadra"
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
          {uiStatus === 'apiError' && <Alert severity="error">{error}</Alert>}
        </Paper>
      </Paper>
    </>
  );
};

export default withStyles(displayData)(Squads);
