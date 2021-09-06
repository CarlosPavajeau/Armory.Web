import AddIcon from '@mui/icons-material/Add';
import { Card, TableCell } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import DataListHead, { HeadLabel } from 'components/data/DataListHead';
import DataListToolbar from 'components/data/DataListToolbar';
import ApiErrors from 'components/feedback/ApiErrors';
import CircularLoader from 'components/loading/CircularLoader';
import Page from 'components/Page';
import Scrollbar from 'components/scrollbar/Scrollbar';
import { usePeople } from 'modules/people/hooks';
import { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const People = (): ReactElement => {
  const [people, peopleUiStatus] = usePeople();

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
    <Page title="Armería | Comandantes">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Comandantes
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/people/register"
            startIcon={<AddIcon />}
          >
            Agregar comandante
          </Button>
        </Stack>

        <Card>
          <DataListToolbar
            filterName={filterName}
            placeholder="Buscar comandante"
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
