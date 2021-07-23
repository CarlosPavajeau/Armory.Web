import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/store';
import { UiStatus } from '../../common/types';
import { People, Person } from './Models';

type PeopleStatus = UiStatus;

export interface PeopleState {
  ui: PeopleStatus;
  error: string;
  wasRegistered: boolean;
  data: People;
  person: Person | null;
}

const initialState: PeopleState = {
  ui: 'idle',
  error: '',
  wasRegistered: false,
  data: [],
  person: null,
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
} = slice.actions;

export const selectError = (state: RootState): string => state.people.error;
export const selectWasRegistered = (state: RootState): boolean =>
  state.people.wasRegistered;
export const selectPeople = (state: RootState): People => state.people.data;
export const selectPerson = (state: RootState): Person | null =>
  state.people.person;
export const selectUiStatus = (state: RootState): PeopleStatus =>
  state.people.ui;

export default slice.reducer;
