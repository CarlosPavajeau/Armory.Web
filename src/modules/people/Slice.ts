import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Storage from 'common/plugins/Storage';
import { RootState } from 'common/store';
import { UiStatus } from 'common/types';

import { People, Person } from './Models';

type PeopleStatus = UiStatus;

export interface PeopleState {
  ui: PeopleStatus;
  error: string;
  wasRegistered: boolean;
  data: People;
  person: Person | null;
  currentPerson: Person | null;
}

const loadCurrentPerson = (): Person | null =>
  JSON.parse(Storage.get('current_person') || 'null');

const initialState: PeopleState = {
  ui: 'idle',
  error: '',
  wasRegistered: false,
  data: [],
  person: null,
  currentPerson: loadCurrentPerson(),
};

export const slice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    registeredCorrectly: state => {
      state.wasRegistered = true;
    },
    resetRegister: state => {
      state.wasRegistered = false;
      state.error = '';
    },
    setCurrentPerson: (state, action: PayloadAction<Person>) => {
      state.currentPerson = action.payload;
    },
    loadingPeople: state => {
      state.ui = 'loading';
    },
    loadPeople: (state, action: PayloadAction<People>) => {
      state.ui = 'loaded';
      state.data = action.payload;
    },
    loadingPerson: state => {
      state.ui = 'loading';
    },
    loadPerson: (state, action: PayloadAction<Person>) => {
      state.ui = 'loaded';
      state.person = action.payload;
    },
    updatingPerson: state => {
      state.ui = 'updating';
    },
    updatedPerson: state => {
      state.ui = 'updated';
    },
    deletingPerson: state => {
      state.ui = 'deleting';
    },
    deletedPerson: (state, action: PayloadAction<string>) => {
      state.ui = 'deleted';

      if (state.person && state.person.id === action.payload) {
        state.person = null;
      }

      if (state.data && state.data.length > 0) {
        state.data = state.data.filter(p => p.id !== action.payload);
      }
    },
    apiError: (state, action: PayloadAction<string>) => {
      state.ui = 'apiError';
      state.error = action.payload;
    },
  },
});

export const {
  registeredCorrectly,
  resetRegister,
  loadingPeople,
  loadPeople,
  loadingPerson,
  loadPerson,
  updatingPerson,
  updatedPerson,
  deletingPerson,
  deletedPerson,
  apiError,
  setCurrentPerson,
} = slice.actions;

export const selectError = (state: RootState): string => state.people.error;
export const selectWasRegistered = (state: RootState): boolean =>
  state.people.wasRegistered;
export const selectCurrentPerson = (state: RootState): Person | null =>
  state.people.currentPerson;
export const selectPeople = (state: RootState): People => state.people.data;
export const selectPerson = (state: RootState): Person | null =>
  state.people.person;
export const selectUiStatus = (state: RootState): PeopleStatus =>
  state.people.ui;

export default slice.reducer;
