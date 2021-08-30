import { Tooltip, WithStyles, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import GetAppIcon from '@material-ui/icons/GetApp';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { displayData } from 'common/styles';
import DisplayDataHeader from 'components/data/DisplayDataHeader';
import Alert from 'components/feedback/Alert';
import CircularLoader from 'components/loading/CircularLoader';
import FileSaver from 'file-saver';
import { generateQr, getWeapons } from 'modules/armament/weapons/Service';
import {
  apiError,
  loadingWeapons,
  loadWeapons,
  selectError,
  selectUiStatus,
  selectWeapons,
} from 'modules/armament/weapons/Slice';
import { ReactElement, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';

export type WeaponsProps = WithStyles<typeof displayData>;

const Weapons = (props: WeaponsProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const weapons = useAppSelector(selectWeapons);
  const uiStatus = useAppSelector(selectUiStatus);
  const error = useAppSelector(selectError);

  const fetchWeapons = useCallback(async () => {
    try {
      dispatch(loadingWeapons());
      const result = await getWeapons();
      dispatch(loadWeapons(result));
    } catch (err: unknown) {
      dispatch(apiError((err as Error).message));
    }
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await fetchWeapons();
    })();
  }, [fetchWeapons]);

  const handleRefresh = async () => {
    await fetchWeapons();
  };

  const generateWeaponQr = async (code: string) => {
    try {
      const result = await generateQr(code);
      FileSaver.saveAs(result, `qr-${code}.pdf`);
    } catch (err: unknown) {
      dispatch(apiError((err as Error).message));
    }
  };

  return (
    <>
      <Helmet>
        <title>Armería | Armas</title>
      </Helmet>
      <Paper>
        <DisplayDataHeader
          placeholder="Buscar arma"
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
            <CircularLoader size={150} message="Cargando armas..." />
          )}
          {uiStatus === 'loaded' && (
            <TableContainer className={classes.container}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Código</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Marca</TableCell>
                    <TableCell>Modelo</TableCell>
                    <TableCell>Calibre</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {weapons.map(weapon => {
                    return (
                      <TableRow key={weapon.code}>
                        <TableCell>{weapon.code}</TableCell>
                        <TableCell>{weapon.type}</TableCell>
                        <TableCell>{weapon.mark}</TableCell>
                        <TableCell>{weapon.model}</TableCell>
                        <TableCell>{weapon.caliber}</TableCell>
                        <TableCell>
                          <Tooltip title="Generar y descargar código QR">
                            <IconButton
                              onClick={() => generateWeaponQr(weapon.code)}
                            >
                              <GetAppIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
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

export default withStyles(displayData)(Weapons);
