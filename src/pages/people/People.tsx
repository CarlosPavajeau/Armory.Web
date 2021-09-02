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
import Page from 'components/Page';
import PeopleListHead, { HeadLabel } from 'components/people/PeopleListHead';
import PeopleListToolbar from 'components/people/PeopleListToolbar';
import Scrollbar from 'components/scrollbar/Scrollbar';
import { getPeople } from 'modules/people/Service';
import { loadingPeople, loadPeople, selectPeople } from 'modules/people/Slice';
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
  const fetchPeople = useCallback(async () => {
    try {
      dispatch(loadingPeople());
      const result = await getPeople();
      dispatch(loadPeople(result));
    } catch (err) {
      // Ignore error
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
          <PeopleListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <PeopleListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {people.map(person => {
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
