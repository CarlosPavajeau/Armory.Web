import { Card } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Stack from '@material-ui/core/Stack';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import DataListHead, { HeadLabel } from 'components/data/DataListHead';
import DataListToolbar from 'components/data/DataListToolbar';
import ApiErrors from 'components/feedback/ApiErrors';
import CircularLoader from 'components/loading/CircularLoader';
import Page from 'components/Page';
import Scrollbar from 'components/scrollbar/Scrollbar';
import { getDegrees } from 'modules/degrees/Service';
import {
  loadDegrees,
  loadingDegrees,
  selectDegrees,
  selectUiStatus,
} from 'modules/degrees/Slice';
import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Degrees = (): ReactElement => {
  const dispatch = useAppDispatch();
  const degrees = useAppSelector(selectDegrees);
  const uiStatus = useAppSelector(selectUiStatus);

  const fetchDegrees = useCallback(async () => {
    try {
      dispatch(loadingDegrees());
      const result = await getDegrees();
      dispatch(loadDegrees(result));
    } catch (err) {
      // Ignore error
    }
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await fetchDegrees();
    })();
  }, [fetchDegrees]);

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');

  const handleRequestSort = (
    event: MouseEvent<HTMLSpanElement>,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setFilterName(event.target.value);
  };

  const HEAD: HeadLabel[] = [
    { id: 'id', label: 'Id', alignRight: false },
    { id: 'name', label: 'Nombre', alignRight: false },
    { id: 'rankId', label: 'Rango', alignRight: false },
  ];

  return (
    <Page title="Armería | Grados">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography>Grados</Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/degrees/register"
            startIcon={<AddIcon />}
          >
            Agregar grado
          </Button>
        </Stack>

        <Card>
          <DataListToolbar
            filterName={filterName}
            placeholder="Buscar grado"
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <DataListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={HEAD}
                  onRequestSort={handleRequestSort}
                />

                <TableBody>
                  {uiStatus === 'loading' && (
                    <TableRow>
                      <TableCell
                        align="center"
                        colSpan={HEAD.length}
                        sx={{ py: 3 }}
                      >
                        <CircularLoader
                          size={150}
                          message="Cargando grados..."
                        />
                      </TableCell>
                    </TableRow>
                  )}
                  {uiStatus === 'loaded' &&
                    degrees.length > 0 &&
                    degrees.map(degree => {
                      const { id, name, rankName } = degree;
                      return (
                        <TableRow key={id} tabIndex={-1} hover>
                          <TableCell>{id}</TableCell>
                          <TableCell>{name}</TableCell>
                          <TableCell>{rankName}</TableCell>
                        </TableRow>
                      );
                    })}

                  <TableRow>
                    <TableCell
                      align="center"
                      colSpan={HEAD.length}
                      sx={{ py: 3 }}
                    >
                      <ApiErrors />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
};

export default Degrees;
