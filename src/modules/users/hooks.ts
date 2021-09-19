import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import Consola from 'consola';
import { useEffect } from 'react';

import { ArmoryRoles } from './Models';
import { getRoles } from './Service';
import { loadingRoles, loadRoles, selectRoles, selectUiStatus } from './Slice';

export const useRoles = (): [ArmoryRoles, UiStatus] => {
  const dispatch = useAppDispatch();
  const userUiStatus = useAppSelector(selectUiStatus);
  const roles = useAppSelector(selectRoles);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingRoles());
        const result = await getRoles();
        dispatch(loadRoles(result));
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          Consola.warn(err);
        }
      }
    })();
  }, [dispatch]);

  return [roles, userUiStatus];
};
