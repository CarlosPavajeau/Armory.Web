import { Card, TableCell } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Stack from '@material-ui/core/Stack';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
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
import { getPeople } from 'modules/people/Service';
import {
  apiError,
  loadingPeople,
  loadPeople,
  selectPeople,
  selectUiStatus,
} from 'modules/people/Slice';
import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Link as RouterLink } from 'react-router-dom';

const People = (): ReactElement => {
  const dispatch = useAppDispatch();
  const people = useAppSelector(selectPeople);
  const peopleUiStatus = useAppSelector(selectUiStatus);
  const fetchPeople = useCallback(async () => {
    try {
      dispatch(loadingPeople());
      const result = await getPeople();
      dispatch(loadPeople(result));
    } catch (err) {
      dispatch(apiError('No se pudieron cargar las personas'));
    }
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await fetchPeople();
    })();
  }, [fetchPeople]);

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
  ];

  return (
    <Page title="Armería | Personas">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Personas
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/people/register"
            startIcon={<AddIcon />}
          >
            Agregar persona
          </Button>
        </Stack>

        <Card>
          <DataListToolbar
            filterName={filterName}
            placeholder="Buscar persona"
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
                  {peopleUiStatus === 'loading' && (
                    <TableRow>
                      <TableCell
                        align="center"
                        colSpan={HEAD.length}
                        sx={{ py: 3 }}
                      >
                        <CircularLoader
                          size={150}
                          message="Cargando personas..."
                        />
                      </TableCell>
                    </TableRow>
                  )}
                  {peopleUiStatus === 'loaded' &&
                    people.length > 0 &&
                    people.map(person => {
                      const {
                        id,
                        firstName,
                        secondName,
                        lastName,
                        secondLastName,
                      } = person;
                      return (
                        <TableRow key={id} tabIndex={-1} hover>
                          <TableCell>{id}</TableCell>
                          <TableCell>
                            {firstName} {secondName} {lastName} {secondLastName}
                          </TableCell>
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

export default People;
