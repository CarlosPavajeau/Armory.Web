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
import DataListHead, { HeadLabel } from 'components/data/DataListHead';
import DataListToolbar from 'components/data/DataListToolbar';
import ApiErrors from 'components/feedback/ApiErrors';
import CircularLoader from 'components/loading/CircularLoader';
import Page from 'components/Page';
import Scrollbar from 'components/scrollbar/Scrollbar';
import { useTroopers } from 'modules/troopers/hooks';
import { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Troopers = (): ReactElement => {
  const [troopers, uiStatus] = useTroopers();

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
    { id: 'squadCode', label: 'Escuadrón', alignRight: false },
    { id: 'degreeId', label: 'Grado', alignRight: false },
  ];

  return (
    <Page title="Armería | Tropas">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Cadetes, alumnos y soldados
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/troopers/register"
            startIcon={<AddIcon />}
          >
            Agregar cadete, alumno o soldado
          </Button>
        </Stack>

        <Card>
          <DataListToolbar
            filterName={filterName}
            placeholder="Buscar cadete alumno o soldado"
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
                          message="Cargando cadetes, alumnos y soldados..."
                        />
                      </TableCell>
                    </TableRow>
                  )}
                  {uiStatus === 'loaded' &&
                    troopers.length > 0 &&
                    troopers.map(troop => {
                      const {
                        id,
                        firstName,
                        secondName,
                        lastName,
                        secondLastName,
                        squadCode,
                        degreeId,
                      } = troop;
                      return (
                        <TableRow key={id} tabIndex={-1} hover>
                          <TableCell>{id}</TableCell>
                          <TableCell>
                            {firstName} {secondName} {lastName} {secondLastName}
                          </TableCell>
                          <TableCell>{squadCode}</TableCell>
                          <TableCell>{degreeId}</TableCell>
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

export default Troopers;
