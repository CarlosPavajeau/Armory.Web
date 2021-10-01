import AddIcon from '@mui/icons-material/Add';
import { Card, TableCell, TablePagination } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import ChangePersonDegreeDialog from 'components/dashboard/people/ChangePersonDegreeDialog';
import PersonMoreMenu from 'components/dashboard/people/PersonMoreMenu';
import { HeadLabel } from 'components/data/DataListHead';
import DataListToolbar from 'components/data/DataListToolbar';
import SimpleDataListHead from 'components/data/SimpleDataListHead';
import ApiErrors from 'components/feedback/ApiErrors';
import CircularLoader from 'components/loading/CircularLoader';
import Page from 'components/Page';
import Scrollbar from 'components/scrollbar/Scrollbar';
import { filter } from 'lodash';
import { usePeople } from 'modules/people/hooks';
import { Person } from 'modules/people/Models';
import { ChangeEvent, ReactElement, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTablePagination } from 'shared/hooks/useTablePagination';

const People = (): ReactElement => {
  const [people, peopleUiStatus] = usePeople();
  const [filterName, setFilterName] = useState('');

  const filteredPeople = filter(people, (person: Person) => {
    const { firstName, secondName, lastName, secondLastName } = person;
    const fullName = `${firstName} ${secondName} ${lastName} ${secondLastName}`;
    return fullName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1;
  });

  const [page, rowsPerPage, handleChangePage, handleChangeRowsPerPage] =
    useTablePagination();

  const handleFilterByName = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setFilterName(event.target.value);
  };

  const HEAD: HeadLabel[] = [
    { id: 'id', label: 'Id', alignRight: false },
    { id: 'degreeName', label: 'Grado', alignRight: false },
    { id: 'name', label: 'Nombre', alignRight: false },
    { id: 'rankName', label: 'Cargo de operaciones', alignRight: false },
    { id: '' },
  ];

  const [isOpenChangePersonDegree, setIsOpenChangePersonDegree] =
    useState(false);
  const [currentPersonId, setCurrentPersonId] = useState('');

  const handleOnCloseChangePersonDegree = () => {
    setIsOpenChangePersonDegree(false);
  };

  const handleChangePersonDegreeClick = (personId: string) => {
    setCurrentPersonId(personId);
    setIsOpenChangePersonDegree(true);
  };

  return (
    <Page title="Armería | Comandantes">
      <Container>
        <ChangePersonDegreeDialog
          open={isOpenChangePersonDegree}
          personId={currentPersonId}
          onClose={handleOnCloseChangePersonDegree}
        />
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
            <TableContainer sx={{ minWidth: 800, maxHeight: 450 }}>
              <Table>
                <SimpleDataListHead head={HEAD} />
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
                          message="Cargando comandantes..."
                        />
                      </TableCell>
                    </TableRow>
                  )}
                  {peopleUiStatus === 'loaded' &&
                    filteredPeople.length > 0 &&
                    filteredPeople
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map(person => {
                        const {
                          id,
                          firstName,
                          secondName,
                          lastName,
                          secondLastName,
                          rankName,
                          degreeName,
                        } = person;
                        return (
                          <TableRow key={id} tabIndex={-1} hover>
                            <TableCell>{id}</TableCell>
                            <TableCell>{degreeName}</TableCell>
                            <TableCell>
                              {firstName} {secondName} {lastName}{' '}
                              {secondLastName}
                            </TableCell>
                            <TableCell>{rankName}</TableCell>

                            <TableCell align="right">
                              <PersonMoreMenu
                                personId={id}
                                onChangePersonDegreeClick={
                                  handleChangePersonDegreeClick
                                }
                              />
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
            count={filteredPeople.length}
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

export default People;
