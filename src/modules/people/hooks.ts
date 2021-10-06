import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import { People } from 'modules/people/models';
import {
  fetchPeople,
  fetchPeopleByRank,
  selectPeople,
  selectUiStatus,
} from 'modules/people/slice';
import { useEffect } from 'react';

export const usePeopleByRank = (rankName: string): [People, UiStatus] => {
  const dispatch = useAppDispatch();
  const people = useAppSelector(selectPeople);
  const peopleUiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    dispatch(fetchPeopleByRank(rankName));
  }, [dispatch, rankName]);

  return [people, peopleUiStatus];
};

export const usePeople = (): [People, UiStatus] => {
  const dispatch = useAppDispatch();
  const people = useAppSelector(selectPeople);
  const peopleUiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    dispatch(fetchPeople());
  }, [dispatch]);

  return [people, peopleUiStatus];
};
