import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import Storage from 'common/plugins/Storage';
import { RootState } from 'common/store';
import { UiStatus } from 'common/types';
import {
  CreatePersonRequest,
  People,
  Person,
  UpdatePersonDegreeRequest,
} from 'modules/people/models';
import PeopleService from 'modules/people/service';

type PeopleStatus = UiStatus;

export interface PeopleState {
  ui: PeopleStatus;
  data: People;
  person: Person | null;
  currentPerson: Person | null;
}

const loadCurrentPerson = (): Person | null =>
  JSON.parse(Storage.get('current_person') || 'null');

const initialState: PeopleState = {
  ui: 'idle',
  data: [],
  person: null,
  currentPerson: loadCurrentPerson(),
};

/**
 * Create person action
 * @param data request body
 */
export const createPerson = createAsyncThunk(
  'people/create',
  async (data: CreatePersonRequest) => {
    await PeopleService.createPerson(data);
  },
);

/**
 * Fetch people action
 */
export const fetchPeople = createAsyncThunk('people/fetch_all', async () => {
  return PeopleService.fetchPeople();
});

/**
 * Fetch people by rank action
 * @param rank name of the rank to fetch people
 */
export const fetchPeopleByRank = createAsyncThunk(
  'people/fetch_all_by_rank',
  async (rank: string) => {
    return PeopleService.fetchPeopleByRank(rank);
  },
);

/**
 * Fetch person by user action
 */
export const fetchPersonByUserId = createAsyncThunk(
  'people/fetch_by_user',
  async (userId: string) => {
    return PeopleService.fetchPersonByUserId(userId);
  },
);

/**
 * Update person degree action
 * @param data request body
 */
export const updatePersonDegree = createAsyncThunk(
  'people/update_degree',
  async (data: UpdatePersonDegreeRequest) => {
    await PeopleService.updatePersonDegree(data);
  },
);

export const slice = createSlice({
  name: 'people',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchPeopleByRank.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchPersonByUserId.fulfilled, (state, action) => {
        state.currentPerson = action.payload;
        Storage.set('current_person', JSON.stringify(action.payload));
      })
      .addMatcher(
        isAnyOf(
          fetchPeople.pending,
          fetchPeopleByRank.pending,
          fetchPersonByUserId.pending,
        ),
        state => {
          state.ui = 'loading';
        },
      )
      .addMatcher(
        isAnyOf(
          fetchPeople.fulfilled,
          fetchPeople.rejected,
          fetchPeopleByRank.fulfilled,
          fetchPeopleByRank.rejected,
        ),
        state => {
          state.ui = 'idle';
        },
      );
  },
});

export const selectCurrentPerson = (state: RootState): Person | null =>
  state.people.currentPerson;
export const selectPeople = (state: RootState): People => state.people.data;
export const selectPerson = (state: RootState): Person | null =>
  state.people.person;
export const selectUiStatus = (state: RootState): PeopleStatus =>
  state.people.ui;

export default slice.reducer;
