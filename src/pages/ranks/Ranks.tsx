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
import { selectRanks, selectUiStatus } from '../../modules/ranks/Slice';
import { getRanks } from '../../modules/ranks/Service';
import DisplayDataHeader from '../../components/data/DisplayDataHeader';

export type RanksProps = WithStyles<typeof displayData>;

const Ranks = (props: RanksProps): ReactElement => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const ranks = useAppSelector(selectRanks);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    (async () => {
      await getRanks(dispatch);
    })();
  }, [dispatch]);

  const handleRefresh = async () => {
    await getRanks(dispatch);
  };

  return (
    <>
      <Helmet>
        <title>Armería | Rangos</title>
      </Helmet>
      <Paper>
        <DisplayDataHeader
          placeholder="Buscar rango"
          handleRefresh={handleRefresh}
        />
        <Paper elevation={0}>
          {uiStatus === 'loading' && (
            <CircularLoader size={150} message="Cargando rangos" />
          )}
          {uiStatus === 'loaded' && (
            <TableContainer className={classes.container}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Nombre</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ranks.map(rank => {
                    return (
                      <TableRow key={rank.id}>
                        <TableCell>{rank.id}</TableCell>
                        <TableCell>{rank.name}</TableCell>
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

export default withStyles(displayData)(Ranks);
