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
import CircularLoader from '../../../components/loading/CircularLoader';
import { useAppDispatch, useAppSelector } from '../../../common/hooks';
import { displayData } from '../../../common/styles';
import DisplayDataHeader from '../../../components/data/DisplayDataHeader';
import {
  selectExplosives,
  selectUiStatus,
  selectError,
  loadingExplosives,
  loadExplosives,
  apiError,
} from '../../../modules/armament/explosives/Slice';
import { getExplosives } from '../../../modules/armament/explosives/Service';
import Alert from '../../../components/feedback/Alert';

export type ExplosivesProps = WithStyles<typeof displayData>;

const Explosives = (props: ExplosivesProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const explosives = useAppSelector(selectExplosives);
  const uiStatus = useAppSelector(selectUiStatus);
  const error = useAppSelector(selectError);

  const fetchExplosives = useCallback(async () => {
    try {
      dispatch(loadingExplosives());
      const result = await getExplosives();
      dispatch(loadExplosives(result));
    } catch (err) {
      dispatch(apiError(err.message));
    }
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await fetchExplosives();
    })();
  }, [fetchExplosives]);

  const handleRefresh = async () => {
    await fetchExplosives();
  };

  return (
    <>
      <Helmet>
        <title>Armería | Explosivos</title>
      </Helmet>
      <Paper>
        <DisplayDataHeader
          placeholder="Buscar explosivo"
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
            <CircularLoader size={150} message="Cargando explosivos" />
          )}
          {uiStatus === 'loaded' && (
            <TableContainer className={classes.container}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Código</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Marca</TableCell>
                    <TableCell>Calibre</TableCell>
                    <TableCell>Número de serie</TableCell>
                    <TableCell>Candidad disponible</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {explosives.map(explosive => {
                    return (
                      <TableRow key={explosive.code}>
                        <TableCell>{explosive.code}</TableCell>
                        <TableCell>{explosive.type}</TableCell>
                        <TableCell>{explosive.mark}</TableCell>
                        <TableCell>{explosive.caliber}</TableCell>
                        <TableCell>{explosive.series}</TableCell>
                        <TableCell>{explosive.quantityAvailable}</TableCell>
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

export default withStyles(displayData)(Explosives);
