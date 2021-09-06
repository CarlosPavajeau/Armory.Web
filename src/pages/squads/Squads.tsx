import AddIcon from '@mui/icons-material/Add';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import DataListHead, { HeadLabel } from 'components/data/DataListHead';
import DataListToolbar from 'components/data/DataListToolbar';
import ApiErrors from 'components/feedback/ApiErrors';
import CircularLoader from 'components/loading/CircularLoader';
import Page from 'components/Page';
import Scrollbar from 'components/scrollbar/Scrollbar';
import { getSquads } from 'modules/squads/Service';
import {
  apiError,
  loadingSquads,
  loadSquads,
  selectSquads,
  selectUiStatus,
} from 'modules/squads/Slice';
import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Squads = (): ReactElement => {
  const dispatch = useAppDispatch();
  const squads = useAppSelector(selectSquads);
  const uiStatus = useAppSelector(selectUiStatus);

  const fetchSquads = useCallback(async () => {
    try {
      dispatch(loadingSquads());
      const result = await getSquads();
      dispatch(loadSquads(result));
    } catch (err: unknown) {
      dispatch(apiError((err as Error).message));
    }
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await fetchSquads();
    })();
  }, [fetchSquads]);

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
    { id: 'code', label: 'Código', alignRight: false },
    { id: 'name', label: 'Nombre', alignRight: false },
    { id: 'squadronName', label: 'Escuadrilla', alignRight: false },
    { id: 'ownerName', label: 'Comandante', alignRight: false },
  ];

  return (
    <Page title="Armeria | Escuadras">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Escuadras
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/squads/register"
            startIcon={<AddIcon />}
          >
            Agregar escuadra
          </Button>
        </Stack>

        <Card>
          <DataListToolbar
            filterName={filterName}
            placeholder="Buscar escuadra"
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
                          message="Cargando escuadras..."
                        />
                      </TableCell>
                    </TableRow>
                  )}
                  {uiStatus === 'loaded' &&
                    squads.length > 0 &&
                    squads.map(squad => {
                      const { code, name, squadronName, ownerName } = squad;
                      return (
                        <TableRow key={code} tabIndex={-1} hover>
                          <TableCell>{code}</TableCell>
                          <TableCell>{name}</TableCell>
                          <TableCell>{squadronName}</TableCell>
                          <TableCell>{ownerName}</TableCell>
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

export default Squads;
