import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import Consola from 'consola';
import { AssignedWeaponMagazineFormat } from 'modules/formats/assigned-weapon-magazine/Models';
import { getAssignedWeaponMagazineFormat } from 'modules/formats/assigned-weapon-magazine/Service';
import {
  loadedAssignedWeaponMagazineFormat,
  loadingAssignedWeaponMagazineFormat,
  selectAssignedWeaponMagazineFormatUiStatus,
  selectCurrentFormat,
} from 'modules/formats/assigned-weapon-magazine/Slice';
import { useEffect } from 'react';

export const useAssignedWeaponMagazineFormat = (
  formatId: number,
): [AssignedWeaponMagazineFormat | null, UiStatus] => {
  const dispatch = useAppDispatch();
  const format = useAppSelector(selectCurrentFormat);
  const uiStatus = useAppSelector(selectAssignedWeaponMagazineFormatUiStatus);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingAssignedWeaponMagazineFormat());
        const result = await getAssignedWeaponMagazineFormat(formatId);
        dispatch(loadedAssignedWeaponMagazineFormat(result));
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
      }
    })();
  }, [dispatch, formatId]);

  return [format, uiStatus];
};
