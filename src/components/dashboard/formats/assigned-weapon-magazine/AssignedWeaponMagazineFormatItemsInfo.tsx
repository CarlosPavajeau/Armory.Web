import { Card, TableCell } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import DataListHead, { HeadLabel } from 'components/data/DataListHead';
import DataListToolbar from 'components/data/DataListToolbar';
import Scrollbar from 'components/scrollbar/Scrollbar';
import { AssignedWeaponMagazineFormatItems } from 'modules/formats/assigned-weapon-magazine/Models';
import { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';

interface AssignedWeaponMagazineFormatItemsProps {
  records: AssignedWeaponMagazineFormatItems | undefined;
}

const AssignedWeaponMagazineFormatItemsInfo = (
  props: AssignedWeaponMagazineFormatItemsProps,
): ReactElement => {
  const { records } = props;
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
    { id: 'troopId', label: 'Cadete, soldado o alumno', alignRight: false },
    { id: 'ammunitionQuantity', label: 'Cant. Munición', alignRight: false },
    { id: 'ammunitionLot', label: 'Lote Munición', alignRight: false },
    {
      id: 'cartridgeOfLife',
      label: 'Cartucho de securidad',
      alignRight: false,
    },
    {
      id: 'verifiedInPhysical',
      label: 'Verificado en físico',
      alignRight: false,
    },
    { id: 'novelty', label: 'Novedad', alignRight: false },
    { id: 'observations', label: 'Observaciones', alignRight: false },
  ];

  return (
    <Card>
      <DataListToolbar
        filterName={filterName}
        placeholder="Buscar ítem"
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
              {records &&
                records.length > 0 &&
                records.map(record => {
                  const {
                    id,
                    troopId,
                    cartridgeOfLife,
                    verifiedInPhysical,
                    novelty,
                    ammunitionQuantity,
                    ammunitionLot,
                    observations,
                  } = record;
                  return (
                    <TableRow key={id} tabIndex={-1} hover>
                      <TableCell>{troopId}</TableCell>
                      <TableCell>{ammunitionQuantity}</TableCell>
                      <TableCell>{ammunitionLot}</TableCell>
                      <TableCell>{cartridgeOfLife ? 'SI' : 'NO'}</TableCell>
                      <TableCell>{verifiedInPhysical ? 'SI' : 'NO'}</TableCell>
                      <TableCell>{novelty ? 'SI' : 'NO'}</TableCell>
                      <TableCell>{observations}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
};

export default AssignedWeaponMagazineFormatItemsInfo;
