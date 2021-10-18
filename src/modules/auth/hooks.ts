import { useAppDispatch, useAppSelector } from 'common/hooks';
import Storage from 'common/plugins/Storage';
import { selectIsAuth, selectPayload } from 'modules/auth/slice';
import { fetchPersonByUserId } from 'modules/people/slice';
import { useEffect } from 'react';

export const useAuth = (): boolean => {
  const payload = useAppSelector(selectPayload);
  const isAuth = useAppSelector(selectIsAuth);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (payload.isAuthenticate && payload.token) {
      Storage.set('user_token', payload.token);

      const { nameid } = Storage.decode(payload.token);
      dispatch(fetchPersonByUserId(nameid));
    } else {
      Storage.remove('user_token');
    }
  }, [dispatch, payload]);

  return isAuth;
};
