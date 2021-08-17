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
import {
  selectAmmunition,
  selectUiStatus,
  selectError,
  loadingAmmunition,
  loadAmmunition,
} from '../../../modules/armament/ammunition/Slice';
import { getAmmunition } from '../../../modules/armament/ammunition/Service';
import DisplayDataHeader from '../../../components/data/DisplayDataHeader';
import Alert from '../../../components/feedback/Alert';

export type AmmunitionProps = WithStyles<typeof displayData>;

const Ammunition = (props: AmmunitionProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const ammunition = useAppSelector(selectAmmunition);
  const uiStatus = useAppSelector(selectUiStatus);
  const error = useAppSelector(selectError);

  const fetchAmmunition = useCallback(async () => {
    dispatch(loadingAmmunition());
    const result = await getAmmunition();
    dispatch(loadAmmunition(result));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await fetchAmmunition();
    })();
  }, [fetchAmmunition]);

  const handleRefresh = async () => {
    await fetchAmmunition();
  };

  return (
    <>
      <Helmet>
        <title>Armería | Municiones</title>
      </Helmet>
      <Paper>
        <DisplayDataHeader
          placeholder="Buscar munición"
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
            <CircularLoader size={150} message="Cargando municiones..." />
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ammunition.map(a => {
                    return (
                      <TableRow key={a.code}>
                        <TableCell>{a.code}</TableCell>
                        <TableCell>{a.type}</TableCell>
                        <TableCell>{a.mark}</TableCell>
                        <TableCell>{a.caliber}</TableCell>
                        <TableCell>{a.series}</TableCell>
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

export default withStyles(displayData)(Ammunition);
