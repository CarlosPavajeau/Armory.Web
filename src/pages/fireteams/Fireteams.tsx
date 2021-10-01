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
import { filter } from 'lodash';
import { useFireteams } from 'modules/fireteams/hooks';
import { Fireteam } from 'modules/fireteams/models';
import { ChangeEvent, ReactElement, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTablePagination } from 'shared/hooks/useTablePagination';

const Fireteams = (): ReactElement => {
  const [fireteams, uiStatus] = useFireteams();
  const [filterName, setFilterName] = useState('');

  const filteredFireteams = filter(fireteams, (fireteam: Fireteam) => {
    const { code, name } = fireteam;
    const lowerFilter = filterName.toLowerCase();
    return (
      code.toLowerCase().indexOf(lowerFilter) !== -1 ||
      name.toLowerCase().indexOf(lowerFilter) !== -1
    );
  });

  const [page, rowsPerPage, handleChangePage, handleChangeRowsPerPage] =
    useTablePagination();

  const handleFilterByName = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setFilterName(event.target.value);
  };

  const HEAD: HeadLabel[] = [
    { id: 'code', label: 'Código', alignRight: false },
    { id: 'name', label: 'Nombre', alignRight: false },
    { id: 'flightName', label: 'Escuadrilla', alignRight: false },
    { id: 'ownerName', label: 'Grado - Comandante', alignRight: false },
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
            to="/dashboard/fireteams/register"
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
            <TableContainer sx={{ minWidth: 800, maxHeight: 450 }}>
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
                          message="Cargando escuadras..."
                        />
                      </TableCell>
                    </TableRow>
                  )}
                  {uiStatus === 'loaded' &&
                    filteredFireteams.length > 0 &&
                    filteredFireteams
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map(fireteam => {
                        const { code, name, flightName, ownerName } = fireteam;
                        return (
                          <TableRow key={code} tabIndex={-1} hover>
                            <TableCell>{code}</TableCell>
                            <TableCell>{name}</TableCell>
                            <TableCell>{flightName}</TableCell>
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

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredFireteams.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
};

export default Fireteams;
