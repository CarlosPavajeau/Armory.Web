import { TableCell, TableSortLabel } from '@mui/material';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { visuallyHidden } from '@mui/utils';
import { MouseEvent, ReactElement } from 'react';

export interface HeadLabel {
  id: string;
  label?: string;
  alignRight?: boolean;
}

interface PeopleListHeadProps {
  order: 'asc' | 'desc';
  orderBy: string;
  headLabel: HeadLabel[];
  onRequestSort: (event: MouseEvent<HTMLSpanElement>, property: string) => void;
}

const DataListHead = (props: PeopleListHeadProps): ReactElement => {
  const { order, orderBy, headLabel, onRequestSort } = props;

  const createSortHandler =
    (property: string) => (event: MouseEvent<HTMLSpanElement>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headLabel.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default DataListHead;
