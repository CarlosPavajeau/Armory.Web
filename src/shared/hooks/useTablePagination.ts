import { ChangeEvent, MouseEvent, useState } from 'react';

export type Page = number;
export type RowsPerPage = number;
export type HandleChangePage = (
  event: MouseEvent<HTMLButtonElement> | null,
  newPage: number,
) => void;
export type HandleChangeRowsPerPage = (
  event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
) => void;

/**
 * Returns stateful values and functions to handle paging logic.
 * @return [Page, RowsPerPage, HandleChangePage, HandleChangeRowsPerPage]
 */
export const useTablePagination = (): [
  Page,
  RowsPerPage,
  HandleChangePage,
  HandleChangeRowsPerPage,
] => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return [page, rowsPerPage, handleChangePage, handleChangeRowsPerPage];
};
