import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Card, TablePagination, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import UpdateDegreeDialog from 'components/dashboard/degrees/UpdateDegreeDialog';
import { HeadLabel } from 'components/data/DataListHead';
import SimpleDataListHead from 'components/data/SimpleDataListHead';
import ApiErrors from 'components/feedback/ApiErrors';
import CircularLoader from 'components/loading/CircularLoader';
import Page from 'components/Page';
import Scrollbar from 'components/scrollbar/Scrollbar';
import { useDegrees } from 'modules/degrees/hooks';
import { ReactElement, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTablePagination } from 'shared/hooks/useTablePagination';

const Degrees = (): ReactElement => {
  const [degrees, uiStatus] = useDegrees();

  const [page, rowsPerPage, handleChangePage, handleChangeRowsPerPage] =
    useTablePagination();

  const HEAD: HeadLabel[] = [
    { id: 'name', label: 'Nombre', alignRight: false },
    { id: 'rankId', label: 'Cargo de operación', alignRight: false },
    { id: '' },
  ];

  const [degreeId, setDegreeId] = useState(0);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const handleClickEdit = (id: number): void => {
    setDegreeId(id);
    setOpenEditDialog(true);
  };

  const onCloseEditDialog = (): void => {
    setOpenEditDialog(false);
  };

  return (
    <Page title="Armería | Grados">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Grados
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/degrees/register"
            startIcon={<AddIcon />}
          >
            Agregar grado
          </Button>
        </Stack>

        <Card>
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
                          message="Cargando grados..."
                        />
                      </TableCell>
                    </TableRow>
                  )}
                  {degrees.length > 0 &&
                    degrees
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map(degree => {
                        const { id, name, rankName } = degree;
                        return (
                          <TableRow key={id} tabIndex={-1} hover>
                            <TableCell>{name}</TableCell>
                            <TableCell>{rankName}</TableCell>

                            <TableCell>
                              <Tooltip title="Editar">
                                <IconButton
                                  aria-label="Editar"
                                  onClick={() => handleClickEdit(id)}
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
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

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={degrees.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>

        <UpdateDegreeDialog
          open={openEditDialog}
          degreeId={degreeId}
          onClose={onCloseEditDialog}
        />
      </Container>
    </Page>
  );
};

export default Degrees;
