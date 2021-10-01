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
import { useEquipments } from 'modules/armament/equipments/hooks';
import { Equipment } from 'modules/armament/equipments/models';
import { ChangeEvent, ReactElement, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTablePagination } from 'shared/hooks/useTablePagination';

const Equipments = (): ReactElement => {
  const [equipments, uiStatus] = useEquipments();
  const [filterName, setFilterName] = useState('');

  const filteredEquipments = filter(equipments, (equipment: Equipment) => {
    const { serial } = equipment;
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
    { id: 'model', label: 'Modelo', alignRight: false },
    {
      id: 'quantityAvailable',
      label: 'Cantidad dispponible',
      alignRight: false,
    },
  ];

  return (
    <Page title="Armería | Equipo especial y accesorios">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Equipo especial y accesorios
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/equipments/register"
            startIcon={<AddIcon />}
          >
            Agregar equipo especial o accesorio
          </Button>
        </Stack>

        <Card>
          <DataListToolbar
            filterName={filterName}
            placeholder="Buscar equipo especial o accesorio"
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
                          message="Cargando equipo especial y accesorios..."
                        />
                      </TableCell>
                    </TableRow>
                  )}
                  {uiStatus === 'loaded' &&
                    filteredEquipments.length > 0 &&
                    filteredEquipments
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map(equipment => {
                        const { serial, type, model, quantityAvailable } =
                          equipment;
                        return (
                          <TableRow key={serial} tabIndex={-1} hover>
                            <TableCell>{serial}</TableCell>
                            <TableCell>{type}</TableCell>
                            <TableCell>{model}</TableCell>
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
            count={filteredEquipments.length}
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

export default Equipments;
