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
import { getExplosives } from 'modules/armament/explosives/Service';
import {
  apiError,
  loadExplosives,
  loadingExplosives,
  selectExplosives,
  selectUiStatus,
} from 'modules/armament/explosives/Slice';
import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Explosives = (): ReactElement => {
  const dispatch = useAppDispatch();
  const explosives = useAppSelector(selectExplosives);
  const uiStatus = useAppSelector(selectUiStatus);

  const fetchExplosives = useCallback(async () => {
    try {
      dispatch(loadingExplosives());
      const result = await getExplosives();
      dispatch(loadExplosives(result));
    } catch (err: unknown) {
      dispatch(apiError((err as Error).message));
    }
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await fetchExplosives();
    })();
  }, [fetchExplosives]);

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
    { id: 'code', label: 'Id', alignRight: false },
    { id: 'type', label: 'Tipo', alignRight: false },
    { id: 'mark', label: 'Marca', alignRight: false },
    { id: 'caliber', label: 'Calibre', alignRight: false },
    { id: 'series', label: 'N° de serie', alignRight: false },
    {
      id: 'quantityAvailable',
      label: 'Cantidad disponible',
      alignRight: false,
    },
  ];

  return (
    <Page title="Armería | Explosivos">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Explosivos
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/explosives/register"
            startIcon={<AddIcon />}
          >
            Agregar explosivo
          </Button>
        </Stack>

        <Card>
          <DataListToolbar
            filterName={filterName}
            placeholder="Buscar explosivo"
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
                      <TableCell>
                        <CircularLoader
                          size={150}
                          message="Cargando explosivos"
                        />
                      </TableCell>
                    </TableRow>
                  )}
                  {uiStatus === 'loaded' &&
                    explosives.length > 0 &&
                    explosives.map(explosive => {
                      const {
                        code,
                        type,
                        mark,
                        caliber,
                        series,
                        quantityAvailable,
                      } = explosive;
                      return (
                        <TableRow key={code} tabIndex={-1} hover>
                          <TableCell>{code}</TableCell>
                          <TableCell>{type}</TableCell>
                          <TableCell>{mark}</TableCell>
                          <TableCell>{caliber}</TableCell>
                          <TableCell>{series}</TableCell>
                          <TableCell>{quantityAvailable}</TableCell>
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

export default Explosives;
