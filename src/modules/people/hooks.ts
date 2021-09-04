import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import { useEffect } from 'react';

import { People } from './Models';
import { getPeople, getPeopleByRole } from './Service';
import {
  apiError,
  apiError as peopleApiError,
  loadingPeople,
  loadPeople,
  selectPeople,
  selectUiStatus,
} from './Slice';

export const usePeopleByRole = (role: string): [People, UiStatus] => {
  const dispatch = useAppDispatch();
  const people = useAppSelector(selectPeople);
  const peopleUiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingPeople());
        const result = await getPeopleByRole(role);
        dispatch(loadPeople(result));
      } catch (err: unknown) {
        dispatch(peopleApiError((err as Error).message));
      }
    })();
  }, [dispatch, role]);

  return [people, peopleUiStatus];
};

export const usePeople = (): [People, UiStatus] => {
  const dispatch = useAppDispatch();
  const people = useAppSelector(selectPeople);
  const peopleUiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingPeople());
        const result = await getPeople();
        dispatch(loadPeople(result));
      } catch (err) {
        dispatch(apiError('No se pudieron cargar las personas'));
      }
    })();
  }, [dispatch]);

  return [people, peopleUiStatus];
};
