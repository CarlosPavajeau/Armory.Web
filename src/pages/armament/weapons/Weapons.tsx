import { ReactElement, useEffect } from 'react';
import { withStyles, WithStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Helmet } from 'react-helmet';
import CircularLoader from '../../../components/loading/CircularLoader';
import { useAppDispatch, useAppSelector } from '../../../common/hooks';
import { displayData } from '../../../common/styles';
import DisplayDataHeader from '../../../components/data/DisplayDataHeader';
import { getWeapons } from '../../../modules/armament/weapons/Service';
import {
  selectWeapons,
  selectUiStatus,
} from '../../../modules/armament/weapons/Slice';

export type WeaponsProps = WithStyles<typeof displayData>;

const Weapons = (props: WeaponsProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const weapons = useAppSelector(selectWeapons);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    (async () => {
      await getWeapons(dispatch);
    })();
  }, [dispatch]);

  const handleRefresh = async () => {
    await getWeapons(dispatch);
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
        <Paper elevation={0}>
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
                    <TableCell>Cantidad disponible</TableCell>
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
                        <TableCell>{weapon.quantityAvailable}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Paper>
    </>
  );
};

export default withStyles(displayData)(Weapons);