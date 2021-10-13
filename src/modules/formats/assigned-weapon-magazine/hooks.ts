import { useAppDispatch, useAppSelector } from 'common/hooks';
import { AssignedWeaponMagazineFormat } from 'modules/formats/assigned-weapon-magazine/models';
import {
  AssignedWeaponMagazineFormatsUiStatus,
  fetchAssignedWeaponMagazineFormat,
  selectAssignedWeaponMagazineFormatUiStatus,
  selectCurrentFormat,
} from 'modules/formats/assigned-weapon-magazine/slice';
import { useEffect } from 'react';

export const useAssignedWeaponMagazineFormat = (
  formatId: number | null,
): [
  AssignedWeaponMagazineFormat | null,
  AssignedWeaponMagazineFormatsUiStatus,
] => {
  const dispatch = useAppDispatch();
  const format = useAppSelector(selectCurrentFormat);
  const uiStatus = useAppSelector(selectAssignedWeaponMagazineFormatUiStatus);

  useEffect(() => {
    if (formatId) {
      dispatch(fetchAssignedWeaponMagazineFormat(formatId));
    }
  }, [dispatch, formatId]);

  return [format, uiStatus];
};
