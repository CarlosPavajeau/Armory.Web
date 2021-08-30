import { WithStyles, withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { displayData } from 'common/styles';
import DisplayDataHeader from 'components/data/DisplayDataHeader';
import Alert from 'components/feedback/Alert';
import CircularLoader from 'components/loading/CircularLoader';
import { getEquipments } from 'modules/armament/equipments/Service';
import {
  apiError,
  loadEquipments,
  loadingEquipments,
  selectEquipments,
  selectError,
  selectUiStatus,
} from 'modules/armament/equipments/Slice';
import { ReactElement, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';

export type EquipmentsProps = WithStyles<typeof displayData>;

const Equipments = (props: EquipmentsProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const equipments = useAppSelector(selectEquipments);
  const uiStatus = useAppSelector(selectUiStatus);
  const error = useAppSelector(selectError);

  const fetchEquipments = useCallback(async () => {
    try {
      dispatch(loadingEquipments());
      const result = await getEquipments();
      dispatch(loadEquipments(result));
    } catch (err: unknown) {
      dispatch(apiError((err as Error).message));
    }
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await fetchEquipments();
    })();
  }, [fetchEquipments]);

  const handleRefresh = async () => {
    await fetchEquipments();
  };

  return (
    <>
      <Helmet>
        <title>Armería | Equipos especiales y accesorios</title>
      </Helmet>
      <Paper>
        <DisplayDataHeader
          placeholder="Buscar equipo especial o accesorio"
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
            <CircularLoader
              size={150}
              message="Cargando equipos especiales y accesorios"
            />
          )}
          {uiStatus === 'loaded' && (
            <TableContainer className={classes.container}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Codigo</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Modelo</TableCell>
                    <TableCell>Series</TableCell>
                    <TableCell>Cantidad disponible</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {equipments.map(equipment => {
                    return (
                      <TableRow key={equipment.code}>
                        <TableCell>{equipment.code}</TableCell>
                        <TableCell>{equipment.type}</TableCell>
                        <TableCell>{equipment.model}</TableCell>
                        <TableCell>{equipment.series}</TableCell>
                        <TableCell>{equipment.quantityAvailable}</TableCell>
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

export default withStyles(displayData)(Equipments);
