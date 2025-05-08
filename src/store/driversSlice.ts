import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Driver, ApiResponse} from '../types/api';
import {api} from '../services/api';

interface DriversState {
  drivers: Driver[];
  loading: boolean;
  error: string | null;
  total: number;
  offset: number;
  limit: number;
}

const initialState: DriversState = {
  drivers: [],
  loading: false,
  error: null,
  total: 0,
  offset: 0,
  limit: 30,
};

export const fetchDrivers = createAsyncThunk(
  'drivers/fetchDrivers',
  async ({offset, limit}: {offset: number; limit: number}) => {
    const response = await api.getDrivers(offset, limit);
    return response;
  },
);

const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDrivers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = action.payload.MRData.DriverTable?.Drivers || [];
        state.total = parseInt(action.payload.MRData.total);
        state.offset = parseInt(action.payload.MRData.offset);
        state.limit = parseInt(action.payload.MRData.limit);
      })
      .addCase(fetchDrivers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch drivers';
      });
  },
});

export default driversSlice.reducer;
