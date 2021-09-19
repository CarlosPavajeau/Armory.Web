import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { ReactElement } from 'react';

interface SearchNotFoundProps {
  searchQuery: string;
}

const SearchNotFound = (props: SearchNotFoundProps): ReactElement => {
  const { searchQuery } = props;

  return (
    <Alert severity="info">
      <AlertTitle>Sin resultados</AlertTitle>
      No se encontraron resultados para &nbsp;
      <strong>&quot;{searchQuery}&quot;</strong>. Intente comprobar si hay
      errores tipográficos o usando palabras completas.
    </Alert>
  );
};

export default SearchNotFound;
