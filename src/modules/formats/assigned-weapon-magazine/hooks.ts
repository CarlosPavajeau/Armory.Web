import { useAppDispatch, useAppSelector } from 'common/hooks';
import Consola from 'consola';
import { AssignedWeaponMagazineFormat } from 'modules/formats/assigned-weapon-magazine/Models';
import { getAssignedWeaponMagazineFormat } from 'modules/formats/assigned-weapon-magazine/Service';
import {
  AssignedWeaponMagazineFormatsUiStatus,
  loadedAssignedWeaponMagazineFormat,
  loadingAssignedWeaponMagazineFormat,
  selectAssignedWeaponMagazineFormatUiStatus,
  selectCurrentFormat,
} from 'modules/formats/assigned-weapon-magazine/Slice';
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
    (async () => {
      try {
        if (formatId) {
          dispatch(loadingAssignedWeaponMagazineFormat());
          const result = await getAssignedWeaponMagazineFormat(formatId);
          dispatch(loadedAssignedWeaponMagazineFormat(result));
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
      }
    })();
  }, [dispatch, formatId]);

  return [format, uiStatus];
};
