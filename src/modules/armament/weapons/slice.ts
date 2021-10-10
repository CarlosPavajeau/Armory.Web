import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from 'common/store';
import { UiStatus } from 'common/types';
import {
  CreateWeaponRequest,
  Weapon,
  Weapons,
} from 'modules/armament/weapons/models';
import WeaponsService from 'modules/armament/weapons/service';

export interface WeaponsState {
  ui: UiStatus;
  data: Weapons;
  weapon: Weapon | null;
}

const initialState: WeaponsState = {
  ui: 'idle',
  data: [],
  weapon: null,
};

/**
 * Create weapon action
 * @param data request body
 */
export const createWeapon = createAsyncThunk(
  'weapons/create',
  async (data: CreateWeaponRequest) => {
    await WeaponsService.create(data);
  },
);

/**
 * Fetch all weapon action
 */
export const fetchAllWeapons = createAsyncThunk(
  'weapons/fetch_all',
  async () => {
    return WeaponsService.fetchAll();
  },
);

/**
 * Fetch all weapons by flight action
 * @param flight flight code
 */
export const fetchAllWeaponsByFlight = createAsyncThunk(
  'weapons/fetch_all_by_flight',
  async (flight: string) => {
    return WeaponsService.fetchAllByFlight(flight);
  },
);

/**
 * Fetch a weapon action
 * @param serial weapon serial
 */
export const fetchWeapon = createAsyncThunk(
  'weapons/fetch',
  async (serial: string) => {
    return WeaponsService.fetch(serial);
  },
);

/**
 * Generate weapon qr action
 * @param serial weapon serials
 */
export const generateWeaponQr = createAsyncThunk(
  'weapons/generate_qr',
  async (serial: string) => {
    return WeaponsService.generateQr(serial);
  },
);

export const slice = createSlice({
  name: 'weapons',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchWeapon.fulfilled, (state, action) => {
        state.weapon = action.payload;
      })
      .addMatcher(
        isAnyOf(fetchAllWeapons.fulfilled, fetchAllWeaponsByFlight.fulfilled),
        (state, action) => {
          state.data = action.payload;
        },
      )
      .addMatcher(
        isAnyOf(
          fetchAllWeapons.pending,
          fetchAllWeaponsByFlight.pending,
          fetchWeapon.pending,
        ),
        state => {
          state.ui = 'loading';
        },
      )
      .addMatcher(
        isAnyOf(
          fetchAllWeapons.fulfilled,
          fetchAllWeapons.rejected,
          fetchAllWeaponsByFlight.fulfilled,
          fetchAllWeaponsByFlight.rejected,
          fetchWeapon.fulfilled,
          fetchWeapon.rejected,
        ),
        state => {
          state.ui = 'idle';
        },
      );
  },
});

export const selectWeapons = (state: RootState): Weapons => state.weapons.data;
export const selectWeapon = (state: RootState): Weapon | null =>
  state.weapons.weapon;
export const selectUiStatus = (state: RootState): UiStatus => state.weapons.ui;

export default slice.reducer;
