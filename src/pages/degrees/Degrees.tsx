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
import CircularLoader from '../../components/loading/CircularLoader';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { displayData } from '../../common/styles';
import { selectDegrees, selectUiStatus } from '../../modules/degrees/Slice';
import { getDegrees } from '../../modules/degrees/Service';
import DisplayDataHeader from '../../components/data/DisplayDataHeader';

export type DegreesProps = WithStyles<typeof displayData>;

const Degrees = (props: DegreesProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const degrees = useAppSelector(selectDegrees);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    (async () => {
      await getDegrees(dispatch);
    })();
  }, [dispatch]);

  const handleRefresh = async () => {
    await getDegrees(dispatch);
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
        <Paper elevation={0}>
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
        </Paper>
      </Paper>
    </>
  );
};

export default withStyles(displayData)(Degrees);
