import AddIcon from '@mui/icons-material/Add';
import { Card } from '@mui/material';
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
import { useSquads } from 'modules/squads/hooks';
import { ChangeEvent, ReactElement, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Squads = (): ReactElement => {
  const [squads, uiStatus] = useSquads();
  const [filterName, setFilterName] = useState('');

  const handleFilterByName = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setFilterName(event.target.value);
  };

  const HEAD: HeadLabel[] = [
    { id: 'code', label: 'Código', alignRight: false },
    { id: 'name', label: 'Nombre', alignRight: false },
    { id: 'ownerName', label: 'Grado - Comandante', alignRight: false },
  ];

  return (
    <Page title="Armeria | Escuadrones">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Escuadrones
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/squads/register"
            startIcon={<AddIcon />}
          >
            Agregar escuadrón
          </Button>
        </Stack>

        <Card>
          <DataListToolbar
            filterName={filterName}
            placeholder="Buscar escuadrón"
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
                          message="Cargando escuadrones..."
                        />
                      </TableCell>
                    </TableRow>
                  )}
                  {uiStatus === 'loaded' &&
                    squads.length > 0 &&
                    squads.map(squad => {
                      const { code, name, ownerName } = squad;
                      return (
                        <TableRow key={code} tabIndex={-1} hover>
                          <TableCell>{code}</TableCell>
                          <TableCell>{name}</TableCell>
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
        </Card>
      </Container>
    </Page>
  );
};

export default Squads;
