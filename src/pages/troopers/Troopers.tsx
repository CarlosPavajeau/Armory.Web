import AddIcon from '@mui/icons-material/Add';
import { Card, TablePagination } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { HeadLabel } from 'components/data/DataListHead';
import DataListToolbar from 'components/data/DataListToolbar';
import SimpleDataListHead from 'components/data/SimpleDataListHead';
import ApiErrors from 'components/feedback/ApiErrors';
import CircularLoader from 'components/loading/CircularLoader';
import Page from 'components/Page';
import Scrollbar from 'components/scrollbar/Scrollbar';
import SearchNotFound from 'components/SearchNotFound';
import { filter } from 'lodash';
import { useTroopers } from 'modules/troopers/hooks';
import { Troop } from 'modules/troopers/models';
import { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Troopers = (): ReactElement => {
  const [troopers, uiStatus] = useTroopers();
  const [filterName, setFilterName] = useState('');

  const filteredTroopers = filter(troopers, (troop: Troop) => {
    const { firstName, secondName, lastName, secondLastName } = troop;
    const fullName = `${firstName} ${secondName} ${lastName} ${secondLastName}`;
    return fullName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1;
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleFilterByName = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setFilterName(event.target.value);
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const HEAD: HeadLabel[] = [
    { id: 'id', label: 'Id', alignRight: false },
    { id: 'degreeName', label: 'Grado', alignRight: false },
    { id: 'rankName', label: 'Cargo de operación', alignRight: false },
    { id: 'name', label: 'Nombre', alignRight: false },
    { id: 'fireteamName', label: 'Escuadra', alignRight: false },
  ];

  const isTroopNotFound = filteredTroopers.length === 0;

  return (
    <Page title="Armería | Oficiales, suboficiales y soldados">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Oficiales, suboficiales y soldados
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/troopers/register"
            startIcon={<AddIcon />}
          >
            Agregar oficial, suboficial o soldado
          </Button>
        </Stack>

        <Card>
          <DataListToolbar
            filterName={filterName}
            placeholder="Buscar oficial, suboficial o soldado"
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <SimpleDataListHead head={HEAD} />
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
                          message="Cargando oficiales, suboficiales o soldados..."
                        />
                      </TableCell>
                    </TableRow>
                  )}
                  {uiStatus === 'loaded' &&
                    filteredTroopers.length > 0 &&
                    filteredTroopers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map(troop => {
                        const {
                          id,
                          firstName,
                          secondName,
                          lastName,
                          secondLastName,
                          fireteamName,
                          rankName,
                          degreeName,
                        } = troop;
                        return (
                          <TableRow key={id} tabIndex={-1} hover>
                            <TableCell>{id}</TableCell>
                            <TableCell>{degreeName}</TableCell>
                            <TableCell>{rankName}</TableCell>
                            <TableCell>
                              {firstName} {secondName} {lastName}{' '}
                              {secondLastName}
                            </TableCell>
                            <TableCell>{fireteamName}</TableCell>
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
                {isTroopNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredTroopers.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
};

export default Troopers;
