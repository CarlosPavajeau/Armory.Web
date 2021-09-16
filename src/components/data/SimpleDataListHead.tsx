import { TableCell } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { HeadLabel } from 'components/data/DataListHead';
import { ReactElement } from 'react';

interface SimpleDataListHeadProps {
  head: HeadLabel[];
}

const SimpleDataListHead = (props: SimpleDataListHeadProps): ReactElement => {
  const { head } = props;

  return (
    <TableHead>
      <TableRow>
        {head.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default SimpleDataListHead;
