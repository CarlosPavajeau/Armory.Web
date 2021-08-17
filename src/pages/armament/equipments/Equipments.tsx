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
  selectEquipments,
  selectUiStatus,
  selectError,
  loadingEquipments,
  loadEquipments,
} from '../../../modules/armament/equipments/Slice';
import { getEquipments } from '../../../modules/armament/equipments/Service';
import Alert from '../../../components/feedback/Alert';

export type EquipmentsProps = WithStyles<typeof displayData>;

const Equipments = (props: EquipmentsProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const equipments = useAppSelector(selectEquipments);
  const uiStatus = useAppSelector(selectUiStatus);
  const error = useAppSelector(selectError);

  const fetchEquipments = useCallback(async () => {
    dispatch(loadingEquipments());
    const result = await getEquipments();
    dispatch(loadEquipments(result));
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
        <title>meria | Equipos especiales y accesorios</title>
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
