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
import { useExplosives } from 'modules/armament/explosives/hooks';
import { Explosive } from 'modules/armament/explosives/models';
import { ChangeEvent, ReactElement, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTablePagination } from 'shared/hooks/useTablePagination';

const Explosives = (): ReactElement => {
  const [explosives, uiStatus] = useExplosives();
  const [filterName, setFilterName] = useState('');

  const filteredExplosives = filter(explosives, (explosive: Explosive) => {
    const { serial } = explosive;
    return serial.toLowerCase().indexOf(filterName.toLowerCase()) !== -1;
  });

  const [page, rowsPerPage, handleChangePage, handleChangeRowsPerPage] =
    useTablePagination();

  const handleFilterByName = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setFilterName(event.target.value);
  };

  const HEAD: HeadLabel[] = [
    { id: 'serial', label: 'Número de serie', alignRight: false },
    { id: 'type', label: 'Tipo', alignRight: false },
    { id: 'mark', label: 'Marca', alignRight: false },
    { id: 'lot', label: 'Lote', alignRight: false },
    { id: 'caliber', label: 'Calibre', alignRight: false },
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
                          message="Cargando explosivos"
                        />
                      </TableCell>
                    </TableRow>
                  )}
                  {filteredExplosives.length > 0 &&
                    filteredExplosives
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map(explosive => {
                        const {
                          serial,
                          type,
                          mark,
                          caliber,
                          lot,
                          quantityAvailable,
                        } = explosive;
                        return (
                          <TableRow key={serial} tabIndex={-1} hover>
                            <TableCell>{serial}</TableCell>
                            <TableCell>{type}</TableCell>
                            <TableCell>{mark}</TableCell>
                            <TableCell>{lot}</TableCell>
                            <TableCell>{caliber}</TableCell>
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

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredExplosives.length}
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

export default Explosives;
