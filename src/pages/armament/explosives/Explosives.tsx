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
import DataListHead, { HeadLabel } from 'components/data/DataListHead';
import DataListToolbar from 'components/data/DataListToolbar';
import ApiErrors from 'components/feedback/ApiErrors';
import CircularLoader from 'components/loading/CircularLoader';
import Page from 'components/Page';
import Scrollbar from 'components/scrollbar/Scrollbar';
import { useExplosives } from 'modules/armament/explosives/hooks';
import { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Explosives = (): ReactElement => {
  const [explosives, uiStatus] = useExplosives();

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
    { id: 'code', label: 'Id', alignRight: false },
    { id: 'type', label: 'Tipo', alignRight: false },
    { id: 'mark', label: 'Marca', alignRight: false },
    { id: 'caliber', label: 'Calibre', alignRight: false },
    { id: 'series', label: 'N° de serie', alignRight: false },
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
                      <TableCell>
                        <CircularLoader
                          size={150}
                          message="Cargando explosivos"
                        />
                      </TableCell>
                    </TableRow>
                  )}
                  {uiStatus === 'loaded' &&
                    explosives.length > 0 &&
                    explosives.map(explosive => {
                      const {
                        code,
                        type,
                        mark,
                        caliber,
                        series,
                        quantityAvailable,
                      } = explosive;
                      return (
                        <TableRow key={code} tabIndex={-1} hover>
                          <TableCell>{code}</TableCell>
                          <TableCell>{type}</TableCell>
                          <TableCell>{mark}</TableCell>
                          <TableCell>{caliber}</TableCell>
                          <TableCell>{series}</TableCell>
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
        </Card>
      </Container>
    </Page>
  );
};

export default Explosives;
