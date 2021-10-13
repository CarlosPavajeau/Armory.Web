import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from 'common/store';
import { UiStatus } from 'common/types';
import {
  AssignedWeaponMagazineFormat,
  AssignedWeaponMagazineFormatItem,
} from 'modules/formats/assigned-weapon-magazine/models';
import AssignedWeaponMagazineFormatsService from 'modules/formats/assigned-weapon-magazine/service';

export type AssignedWeaponMagazineFormatsUiStatus =
  | UiStatus
  | 'generating'
  | 'generated';

export interface AssignedWeaponMagazineFormatsState {
  ui: AssignedWeaponMagazineFormatsUiStatus;
  currentFormat: AssignedWeaponMagazineFormat | null;
}

const initialState: AssignedWeaponMagazineFormatsState = {
  ui: 'idle',
  currentFormat: null,
};

/**
 * Fetch AssignedWeaponMagazineFormat action
 * @param id format id
 */
export const fetchAssignedWeaponMagazineFormat = createAsyncThunk(
  'assigned_weapon_magazine_format/fetch',
  async (id: number) => {
    return AssignedWeaponMagazineFormatsService.fetch(id);
  },
);

export const slice = createSlice({
  name: 'assigned_weapon_magazine_formats',
  initialState,
  reducers: {
    addAssignedWeaponMagazineFormatItem: (
      state,
      action: PayloadAction<AssignedWeaponMagazineFormatItem>,
    ) => {
      if (state.currentFormat) {
        state.currentFormat.records = [
          ...state.currentFormat.records,
          action.payload,
        ];
      }
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchAssignedWeaponMagazineFormat.fulfilled, (state, action) => {
        state.currentFormat = action.payload;
      })
      .addCase(fetchAssignedWeaponMagazineFormat.pending, state => {
        state.ui = 'loading';
      })
      .addMatcher(
        isAnyOf(
          fetchAssignedWeaponMagazineFormat.fulfilled,
          fetchAssignedWeaponMagazineFormat.rejected,
        ),
        state => {
          state.ui = 'idle';
        },
      );
  },
});

export const { addAssignedWeaponMagazineFormatItem } = slice.actions;

export const selectCurrentFormat = (
  state: RootState,
): AssignedWeaponMagazineFormat | null =>
  state.assigned_weapon_magazine_format.currentFormat;
export const selectAssignedWeaponMagazineFormatUiStatus = (
  state: RootState,
): AssignedWeaponMagazineFormatsUiStatus =>
  state.assigned_weapon_magazine_format.ui;

export default slice.reducer;
